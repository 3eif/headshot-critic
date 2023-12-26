/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { NextAuthOptions } from "next-auth";
import LinkedinProvider from "next-auth/providers/linkedin";
import { env } from "@/env";
import axios from "axios";

type ImageElement = {
  data: {
    "com.linkedin.digitalmedia.mediaartifact.StillImage": {
      storageSize: {
        width: number;
        height: number;
      };
    };
  };
  identifiers: { identifier: string }[];
};

type LinkedInData = {
  profilePicture: {
    "displayImage~": {
      elements: ImageElement[];
    };
  };
};

export const authOptions = {
  secret: env.NEXTAUTH_SECRET,
  providers: [
    LinkedinProvider({
      clientId: env.LINKEDIN_CLIENT_ID,
      clientSecret: env.LINKEDIN_CLIENT_SECRET,
      issuer: "https://www.linkedin.com",
      userinfo: {
        url: "https://api.linkedin.com/v2/userinfo",
      },
      authorization: {
        url: "https://www.linkedin.com/oauth/v2/authorization",
        params: {
          scope: "profile openid r_basicprofile",
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      token: {
        url: "https://www.linkedin.com/oauth/v2/accessToken",
      },
      profileUrl: "https://api.linkedin.com/v2/me",
      jwks_endpoint: "https://www.linkedin.com/oauth/openid/jwks",
      async profile(profile, tokens) {
        const accessToken = tokens.access_token!;
        const imageUrl = await getProfilePictureUrl(accessToken);
        const defaultImage =
          "https://cdn-icons-png.flaticon.com/512/174/174857.png";
        return {
          id: profile.sub,
          image: imageUrl ?? defaultImage,
        };
      },
    }),
  ],
} satisfies NextAuthOptions;

async function getProfilePictureUrl(accessToken: string) {
  try {
    const response = await axios.get(
      "https://api.linkedin.com/v2/me?projection=(id,profilePicture(displayImage~:playableStreams))",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    const data: LinkedInData = response.data;
    const imageUrl = getHighestResolutionImageUrl(data);
    return imageUrl;
  } catch (error) {
    console.log(error);
    return null;
  }
}

function getHighestResolutionImageUrl(data: LinkedInData): string | undefined {
  const elements = data.profilePicture["displayImage~"].elements;
  if (elements.length === 0) return undefined;

  let highestResElement = elements[0];
  let maxResolution =
    highestResElement!.data[
      "com.linkedin.digitalmedia.mediaartifact.StillImage"
    ].storageSize.width *
    highestResElement!.data[
      "com.linkedin.digitalmedia.mediaartifact.StillImage"
    ].storageSize.height;

  elements.forEach((element) => {
    const currentResolution =
      element.data["com.linkedin.digitalmedia.mediaartifact.StillImage"]
        .storageSize.width *
      element.data["com.linkedin.digitalmedia.mediaartifact.StillImage"]
        .storageSize.height;
    if (currentResolution > maxResolution) {
      highestResElement = element;
      maxResolution = currentResolution;
    }
  });

  return highestResElement!.identifiers[0]?.identifier;
}
