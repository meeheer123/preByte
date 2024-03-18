import { useState } from "react";
import { executeCode } from "../api";

const Output = ({ editorRef, language }) => {
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCode = async () => {
    if (!editorRef.current) {
      console.error("Editor reference is not defined.");
      return;
    }
  
    const sourceCode = editorRef.current.getValue();
    console.log(sourceCode);
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div w="50%">
      <text mb={2} fontSize="lg">
        Output
      </text>
      <button
        variant="outline"
        colorScheme="green"
        mb={4}
        isLoading={isLoading}
        onClick={runCode}
      >
        Run Code
      </button>
      <div
        height="75vh"
        p={2}
        color={isError ? "red.400" : ""}
        border="1px solid"
        borderRadius={4}
        borderColor={isError ? "red.500" : "#333"}
        overflow="auto" // Add overflow property here
      >
        {output
          ? output.map((line, i) => <text key={i}>{line}</text>)
          : 'Click "Run Code" to see the output here'}
      </div>
    </div>
  );
};
export default Output;