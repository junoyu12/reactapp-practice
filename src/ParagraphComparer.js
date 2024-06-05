import React, { useState } from "react";
import diffMatchPatch from "diff-match-patch";
import FileUploader from "./FileUploader";
import TextDisplay from "./TextDisplay";

const ParagraphComparer = () => {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [alignedParagraphs, setAlignedParagraphs] = useState([]);

  const dmp = new diffMatchPatch();

  // Function to extract paragraphs and remove extra white spaces
  const extractParagraphs = (text) => {
    return text
      .split("\n\n") // Split by double newline
      .map((para) => para.trim().replace(/\s+/g, " ")); // Trim and reduce multiple spaces to one
  };

  const alignParagraphs = (paras1, paras2) => {
    let alignments = [];
    for (let para1 of paras1) {
      let bestMatch = { para: null, score: -1 };
      for (let para2 of paras2) {
        let score = dmp.diff_main(para1, para2).length;
        if (score > bestMatch.score) {
          bestMatch = { para: para2, score };
        }
      }
      alignments.push([para1, bestMatch.para]);
    }
    return alignments;
  };

  const handleFileUpload1 = (text) => {
    setText1(text);
    if (text2) {
      const paras1 = extractParagraphs(text);
      const paras2 = extractParagraphs(text2);
      setAlignedParagraphs(alignParagraphs(paras1, paras2));
    }
  };

  const handleFileUpload2 = (text) => {
    setText2(text);
    if (text1) {
      const paras1 = extractParagraphs(text1);
      const paras2 = extractParagraphs(text);
      setAlignedParagraphs(alignParagraphs(paras1, paras2));
    }
  };

  const renderParagraphs = (para1, para2) => {
    const diffs = dmp.diff_main(para1, para2);
    dmp.diff_cleanupSemantic(diffs);
    return diffs.map((part, index) => {
      const color = part[0] === 0 ? "black" : part[0] === -1 ? "red" : "green";
      return (
        <span key={index} style={{ color }}>
          {part[1]}
        </span>
      );
    });
  };

  return (
    <div>
      <FileUploader onFileUpload={handleFileUpload1} />
      <FileUploader onFileUpload={handleFileUpload2} />
      <div style={{ display: "flex" }}>
        <TextDisplay text={text1} />
        <TextDisplay text={text2} />
      </div>
      <div>
        {alignedParagraphs.map(([para1, para2], index) => (
          <div key={index} style={{ margin: "10px 0" }}>
            <h3>Paragraph {index + 1}</h3>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  flex: 1,
                  border: "1px solid black",
                  padding: "10px",
                  margin: "10px",
                }}
              >
                {renderParagraphs(para1, para2)}
              </div>
              <div
                style={{
                  flex: 1,
                  border: "1px solid black",
                  padding: "10px",
                  margin: "10px",
                }}
              >
                {renderParagraphs(para2, para1)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParagraphComparer;
