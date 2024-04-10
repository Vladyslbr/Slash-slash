import React from "react";
import "../scss/error-page.scss";

const codes: {
   [key: string]: string;
} = {
   "404": "Not Found",
};

const asciiArt =
   "      a@|       [%^\n    !t@       *@_}\n   @b%>       @?$ \n   @_@       ;@/@ \n  @-@       }@]@  \n <@@@       @@=   \n t$@       @@+@   \n#@$       /@:@    ";

type TextArtProps = {
   label: string;
   text: string;
};

const TextArt: React.FC<TextArtProps> = ({ label, text }) => {
   return (
      <pre aria-label={label} className="ErrorPage-asciiStyle">
         {text}
      </pre>
   );
};

type ErrorPageProps = {
   errCode: string;
   message?: string;
};

const ErrorPage: React.FC<ErrorPageProps> = ({ errCode, message }) => {
   return (
      <div className="ErrorPage">
         <TextArt label="ASCII art of slash-slash logo" text={asciiArt} />
         <h1>{`${errCode}: ${codes[errCode]}`}</h1>
         <p>{message && message}</p>
      </div>
   );
};

export default ErrorPage;
