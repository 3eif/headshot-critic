"use client";

import { useEffect, useRef, useState } from "react";
import { useCompletion } from "ai/react";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CheckIcon,
} from "@heroicons/react/20/solid";
import {
  CubeTransparentIcon,
  CameraIcon,
  SunIcon,
  FaceSmileIcon,
  PhotoIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import FeedbackLoading from "./feedback-loading";
import { toast } from "sonner";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
interface Feedback {
  category: string;
  score: number;
  feedback: string;
}

const categoryIcon = (category: string) => {
  switch (category) {
    case "composition":
      return (
        <CubeTransparentIcon
          className="h-6 w-6 text-white"
          aria-hidden="true"
        />
      );
    case "lighting":
      return <SunIcon className="h-6 w-6 text-white" aria-hidden="true" />;
    case "clothing":
      return <UserIcon className="h-6 w-6 text-white" aria-hidden="true" />;
    case "expression":
      return (
        <FaceSmileIcon className="h-6 w-6 text-white" aria-hidden="true" />
      );
    case "background":
      return <PhotoIcon className="h-6 w-6 text-white" aria-hidden="true" />;

    default:
      return <PhotoIcon className="h-6 w-6 text-white" aria-hidden="true" />;
  }
};

export default function AiFeedback({ imageUrl }: { imageUrl: string }) {
  const [output, setOutput] = useState<Feedback[]>();
  const [totalScore, setTotalScore] = useState<number>(0);

  const { completion, complete } = useCompletion({
    api: "/api/chat",
    onFinish: (prompt, completion) => {
      completion = completion.replace(/```json/g, "").replace(/```/g, "");
      const feedback = JSON.parse(completion) as Feedback[];
      const totalScore = feedback.reduce(
        (total, category) => total + category.score,
        0,
      );
      setTotalScore(totalScore / 5);
      setOutput(feedback);
    },
    onError(error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      toast.error(error.message);
    },
  });

  const hasCalledComplete = useRef(false);
  useEffect(() => {
    if (imageUrl && !hasCalledComplete.current) {
      hasCalledComplete.current = true;
      void complete(imageUrl);
    }
  }, [imageUrl, complete]);

  const initialSteps = [
    {
      name: "Composition",
      description: "Analyzing the composition of the photo.",
      status: "upcoming",
    },
    {
      name: "Lighting",
      description: "Analyzing the lighting of the photo.",
      status: "upcoming",
    },
    {
      name: "Clothing",
      description: "Analyzing the clothing of the subject.",
      status: "upcoming",
    },
    {
      name: "Expression",
      description: "Analyzing the facial expression of the subject.",
      status: "upcoming",
    },
    {
      name: "Background",
      description: "Analyzing the background of the photo.",
      status: "upcoming",
    },
    {
      name: "Finalyzing",
      description: "Finalyzing feedback and generating report.",
      status: "upcoming",
    },
  ];

  const [steps, setSteps] = useState(initialSteps); // replace initialSteps with your initial steps array

  useEffect(() => {
    const updatedSteps = steps.map((step, index) => {
      if (completion.includes(step.name.toLowerCase())) {
        if (index === 0 || steps[index - 1]!.status === "complete") {
          return { ...step, status: "complete" };
        }
      } else if (
        index > 0 &&
        steps[index - 1]!.status === "complete" &&
        step.status !== "complete"
      ) {
        return { ...step, status: "current" };
      }
      return step;
    });
    setSteps(updatedSteps);
  }, [completion]);

  return (
    <div className="stretch flex w-full flex-col">
      {/* {completion && <p>{completion}</p>} */}
      {!output ? (
        <nav aria-label="Progress">
          <ol role="list" className="items-start overflow-hidden">
            {steps.map((step, stepIdx) => (
              <li
                key={step.name}
                className={classNames(
                  stepIdx !== steps.length - 1 ? "pb-10" : "",
                  "relative",
                )}
              >
                {step.status === "complete" ? (
                  <>
                    {stepIdx !== steps.length - 1 ? (
                      <div
                        className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-blue-400"
                        aria-hidden="true"
                      />
                    ) : null}
                    <a className="group relative flex items-start">
                      <span className="flex h-9 items-center">
                        <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-blue-400 group-hover:bg-blue-600">
                          <CheckIcon
                            className="h-5 w-5 text-white"
                            aria-hidden="true"
                          />
                        </span>
                      </span>
                      <span className="ml-4 flex min-w-0 flex-col text-left">
                        <span className="text-sm font-medium">{step.name}</span>
                        <span className="text-sm text-gray-500">
                          {step.description}
                        </span>
                      </span>
                    </a>
                  </>
                ) : step.status === "current" ? (
                  <>
                    {stepIdx !== steps.length - 1 ? (
                      <div
                        className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300"
                        aria-hidden="true"
                      />
                    ) : null}
                    <a
                      className="group relative flex items-start"
                      aria-current="step"
                    >
                      <span
                        className="flex h-9 items-center"
                        aria-hidden="true"
                      >
                        <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-blue-400 bg-white">
                          <span className="h-2.5 w-2.5 rounded-full bg-blue-400" />
                        </span>
                      </span>
                      <span className="ml-4 flex min-w-0 flex-col text-left">
                        <span className="text-sm font-medium text-blue-500">
                          {step.name}
                        </span>
                        <span className="text-sm text-gray-500">
                          {step.description}
                        </span>
                      </span>
                    </a>
                  </>
                ) : (
                  <>
                    {stepIdx !== steps.length - 1 ? (
                      <div
                        className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300"
                        aria-hidden="true"
                      />
                    ) : null}
                    <a className="group relative flex items-start">
                      <span
                        className="flex h-9 items-center"
                        aria-hidden="true"
                      >
                        <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white group-hover:border-gray-400">
                          <span className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300" />
                        </span>
                      </span>
                      <span className="ml-4 flex min-w-0 flex-col text-left">
                        <span className="text-sm font-medium text-gray-500">
                          {step.name}
                        </span>
                        <span className="text-sm text-gray-500">
                          {step.description}
                        </span>
                      </span>
                    </a>
                  </>
                )}
              </li>
            ))}
          </ol>
        </nav>
      ) : (
        <div>
          <div className="mb-5 text-center">
            <p className="mb-2 truncate text-2xl font-medium text-gray-500">
              Total Score
            </p>
            <p className="text-5xl font-semibold text-gray-900">
              {totalScore}/100
            </p>
          </div>
          <dl className="grid grid-rows-1 gap-5">
            {output.map((category) => (
              <div
                key={category.category}
                className="relative flex h-full flex-col overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6 sm:pt-6"
              >
                <div className="pb-5">
                  <dt>
                    <div className="absolute rounded-md bg-gradient-to-r from-blue-300 to-blue-400 p-3">
                      {categoryIcon(category.category)}
                    </div>
                    <p className="ml-16 truncate text-left text-sm font-medium text-gray-500">
                      {category.category
                        .split(" ")
                        .map(
                          (word) =>
                            word.charAt(0).toUpperCase() + word.slice(1),
                        )
                        .join(" ")}
                    </p>
                  </dt>
                  <dd className="ml-16 flex items-baseline">
                    <p className="text-2xl font-semibold text-gray-900">
                      {category.score}
                    </p>
                  </dd>
                </div>
                <div className="inset-x-0 bottom-0 -mx-4 bg-gray-100 px-4 py-5 sm:-mx-6 sm:-mb-6 sm:px-6">
                  <div className="text-left text-sm">{category.feedback}</div>
                </div>
              </div>
            ))}
          </dl>
        </div>
      )}
    </div>
  );
}
