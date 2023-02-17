"use client";

import Dropdown from "@/components/Dropdown";
import Input from "@/components/Input";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  checkNumberString,
  checkPositiveIntegerString,
} from "@/utils/checkNumber";

const objectiveOptions = [
  { value: "max", label: "Max" },
  { value: "min", label: "Min" },
];

const inequalityOptions = [
  { value: "<=", label: "<=" },
  { value: ">=", label: ">=" },
  { value: "=", label: "=" },
];

const variableOptions = [
  { value: ">= 0", label: ">= 0" },
  { value: "<= 0", label: "<= 0" },
  { value: "urs", label: "urs" },
];

const Simplex = () => {
  const [numberDecisionVariables, setNumberDecisionVariables] = useState("");
  const [numberConstraints, setNumberConstraints] = useState("");
  const [displayDecisionVariables, setDisplayDecisionVariables] = useState<
    number[]
  >([]);

  const [variableConstraints, setVariableConstraints] = useState<string[]>([]);

  const [objective, setObjective] = useState(objectiveOptions[0].value);
  const [objectiveCoefficients, setObjectiveCoefficients] = useState<string[]>(
    []
  );

  const [constraintCoefficients, setConstraintCoefficients] = useState<
    string[][]
  >([]);
  const [errorConstraintCoefficients, setErrorConstraintCoefficients] =
    useState<boolean[][]>([]);

  const [inequality, setInequality] = useState<string[]>([]);
  const [rhs, setRhs] = useState<string[]>([]);

  const [globalError, setGlobalError] = useState(false);

  const maxRange = (value: string) => {
    return value === "" || parseInt(value) <= 10;
  };

  const handleDecisionVariables = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (checkPositiveIntegerString(inputValue) && maxRange(inputValue)) {
      setNumberDecisionVariables(inputValue);
      setDisplayDecisionVariables(
        Array.from({ length: parseInt(inputValue) }, (value, index) => index)
      );
    }
  };

  const handleConstraints = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (checkPositiveIntegerString(inputValue) && maxRange(inputValue)) {
      setNumberConstraints(inputValue);
    }
  };

  const handleVariableDropdown = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const c = parseInt(e.target.name);
    setVariableConstraints((prevState) => {
      const newState = [...prevState];
      newState[c] = e.target.value;
      return newState;
    });
  };

  const handleObjectiveDropdown = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setObjective(e.target.value);
  };

  const handleObjectiveCoefficients = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = e.target.value;
    const c = parseInt(e.target.name);
    setObjectiveCoefficients((prevState) => {
      const newState = [...prevState];
      newState[c] = inputValue;
      return newState;
    });
  };

  const handleConstraintCoefficient = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = e.target.value;
    const [c, x] = e.target.name.split("_");
    setConstraintCoefficients((prevState) => {
      const newState = [...prevState];
      newState[parseInt(c)][parseInt(x)] = inputValue;
      return newState;
    });
    setErrorConstraintCoefficients((prevState) => {
      const newState = [...prevState];
      newState[parseInt(c)][parseInt(x)] = false;
      return newState;
    });
    setGlobalError(false);
  };

  const handleRhs = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const c = parseInt(e.target.name);
    setRhs((prevState) => {
      const newState = [...prevState];
      newState[c] = e.target.value;
      return newState;
    });
  };

  const handleInequalityDropdown = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    e.preventDefault();
    const c = parseInt(e.target.name);
    setInequality((prevState) => {
      const newState = [...prevState];
      newState[c] = e.target.value;
      return newState;
    });
  };

  const handleSolve = () => {
    const validObjectiveCoefficients = objectiveCoefficients.every((element) =>
      checkNumberString(element)
    );

    const validConstraintCoefficients = () => {
      let valid = true;
      for (let i = 0; i < constraintCoefficients.length; i++) {
        for (let j = 0; j < constraintCoefficients[i].length; j++) {
          if (!checkNumberString(constraintCoefficients[i][j])) {
            valid = false;
            setErrorConstraintCoefficients((prevState) => {
              const newState = [...prevState];
              newState[i][j] = true;
              return newState;
            });
            setGlobalError(true);
          }
        }
      }

      return valid;
    };

    const validRhs = rhs.every((element) => checkNumberString(element));

    validConstraintCoefficients();
  };

  useEffect(() => {
    if (numberDecisionVariables) {
      const lenDecisionVariables = parseInt(numberDecisionVariables);

      let newObjectiveCoefficients = Array.from(
        { length: lenDecisionVariables },
        () => ""
      );
      let newVariableConstraints = Array.from(
        { length: lenDecisionVariables },
        () => variableOptions[0].value
      );

      for (
        let i = 0;
        i < Math.min(lenDecisionVariables, objectiveCoefficients.length);
        i++
      ) {
        newObjectiveCoefficients[i] = objectiveCoefficients[i];
        newVariableConstraints[i] = variableConstraints[i];
      }

      setObjectiveCoefficients(newObjectiveCoefficients);
      setVariableConstraints(newVariableConstraints);
    }
  }, [numberDecisionVariables]);

  useEffect(() => {
    if (numberDecisionVariables && numberConstraints) {
      const lenDecisionVariables = parseInt(numberDecisionVariables);
      const lenConstraints = parseInt(numberConstraints);

      let newConstraintCoefficients = Array.from(
        { length: lenConstraints },
        () => Array.from({ length: lenDecisionVariables }, () => "")
      );
      for (
        let i = 0;
        i < Math.min(lenConstraints, constraintCoefficients.length);
        i++
      ) {
        for (
          let j = 0;
          j < Math.min(lenDecisionVariables, constraintCoefficients[i].length);
          j++
        ) {
          newConstraintCoefficients[i][j] = constraintCoefficients[i][j];
        }
      }

      let newRhs = Array.from({ length: lenConstraints }, () => "");
      for (let i = 0; i < Math.min(lenConstraints, rhs.length); i++) {
        newRhs[i] = rhs[i];
      }

      let newIneuqliaty = Array.from(
        { length: lenConstraints },
        () => inequalityOptions[0].value
      );
      for (let i = 0; i < Math.min(lenConstraints, rhs.length); i++) {
        newIneuqliaty[i] = inequality[i];
      }

      let newErrorConstraintCoefficients = Array.from(
        { length: lenConstraints },
        () => Array.from({ length: lenDecisionVariables }, () => false)
      );

      setConstraintCoefficients(newConstraintCoefficients);
      setRhs(newRhs);
      setInequality(newIneuqliaty);
      setErrorConstraintCoefficients(newErrorConstraintCoefficients);
    }
  }, [numberDecisionVariables, numberConstraints]);

  return (
    <div className="flex flex-col gap-y-12">
      <div>
        <button
          disabled={!numberDecisionVariables}
          className="w-24 px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 enabled:hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleSolve}
        >
          Solve
        </button>
        {globalError && (
          <p className="text-red-500">
            There are invalid inputs. Please fix them before attempting to
            solve.
          </p>
        )}
      </div>
      <div>
        <h3 className="mb-2 text-xl font-semibold text-gray-700 dark:text-gray-200">
          Initialize
        </h3>
        <div className="flex gap-x-2.5">
          <div>
            <label>
              <span>Number of Decision Variables: </span>
              <Input
                id="decision_variables"
                name="decision_variables"
                value={numberDecisionVariables}
                onChange={handleDecisionVariables}
              />
            </label>
          </div>
          <div>
            <label>
              <span>Number of Constraints: </span>
              <Input
                id="constraints"
                name="constraints"
                value={numberConstraints}
                onChange={handleConstraints}
              />
            </label>
          </div>
        </div>
      </div>
      {numberDecisionVariables && (
        <>
          <div>
            <h3 className="mb-2 text-xl font-semibold text-gray-700 dark:text-gray-200">
              Decision Variables
            </h3>
            <table className="border-separate border-spacing-2">
              <tbody>
                <tr>
                  {displayDecisionVariables.map((decisionVariable) => (
                    <th key={`header_${decisionVariable}`}>
                      x{decisionVariable + 1}
                    </th>
                  ))}
                </tr>
                <tr>
                  {variableConstraints.map((variableConstraint, index) => (
                    <td>
                      <Dropdown
                        options={variableOptions}
                        name={`${index}`}
                        selected={variableConstraint}
                        onChange={handleVariableDropdown}
                      />
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <h3 className="mb-2 text-xl font-semibold text-gray-700 dark:text-gray-200">
              Objective Function
            </h3>
            <table className="border-separate border-spacing-2">
              <tbody>
                <tr>
                  <th>Min/Max</th>
                  {displayDecisionVariables.map((decisionVariable) => (
                    <th key={`header_${decisionVariable}`}>
                      x{decisionVariable + 1}
                    </th>
                  ))}
                </tr>
                <tr>
                  <td>
                    <Dropdown
                      options={objectiveOptions}
                      selected={objective}
                      onChange={handleObjectiveDropdown}
                    />
                  </td>
                  {objectiveCoefficients.map((objectiveCoefficient, index) => (
                    <td key={`objective_${index}`}>
                      <Input
                        id={`objective_${index}`}
                        name={`${index}`}
                        value={objectiveCoefficient}
                        onChange={handleObjectiveCoefficients}
                      />
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
      {numberConstraints && numberDecisionVariables && (
        <div>
          <h3 className="mb-2 text-xl font-semibold text-gray-700 dark:text-gray-200">
            Subject To:
          </h3>
          <table className="border-separate border-spacing-2">
            <tbody>
              <tr>
                <th>&nbsp;</th>
                {displayDecisionVariables.map((decisionVariable) => (
                  <th key={`header_${decisionVariable}`}>
                    x{decisionVariable + 1}
                  </th>
                ))}
                <th>Inequality</th>
                <th>RHS</th>
              </tr>
              {constraintCoefficients.map((constraintCoefficient, i) => {
                return (
                  <tr key={i}>
                    <td>
                      <b>c{i + 1}</b>
                    </td>
                    {constraintCoefficient.map((coefficient, j) => (
                      <td key={`coefficient_${i}_${j}`}>
                        <Input
                          id={`${i}_${j}`}
                          name={`${i}_${j}`}
                          error={errorConstraintCoefficients[i][j]}
                          value={coefficient}
                          onChange={handleConstraintCoefficient}
                        />
                      </td>
                    ))}
                    <td>
                      <Dropdown
                        options={inequalityOptions}
                        name={`${i}`}
                        selected={inequality[i]}
                        onChange={handleInequalityDropdown}
                      />
                    </td>
                    <td>
                      <Input
                        id={`${i}`}
                        name={`${i}`}
                        value={rhs[i]}
                        onChange={handleRhs}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Simplex;
