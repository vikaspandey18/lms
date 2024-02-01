import React, { useState, useEffect, useRef } from "react";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";

const CustomPPTRenderer = ({ document }) => {
  return (
    <iframe
      src={`https://view.officeapps.live.com/op/embed.aspx?src=${document}`}
      width="100%"
      height="100%"
      title="PowerPoint Presentation"
    ></iframe>
  );
};

CustomPPTRenderer.fileLoader = ({
  documentURI,
  signal,
  fileLoaderComplete,
}) => {
  fileLoaderComplete();
};

DocViewerRenderers.PPTRenderer = CustomPPTRenderer;

const ProjectView = ({ book }) => {
  const [showPPT, setShowPPT] = useState(false);
  const docs = [
    {
      uri: `https://sampledocs.in/DownloadFiles/SampleFile?filename=Test%20powerpoint%20file%20-%20sampledocs&ext=ppt`,
      fileType: "ppt",
    },
  ];
  const viewerRef = useRef(null);

  const openFullscreen = () => {
    if (viewerRef.current.requestFullscreen) {
      viewerRef.current.requestFullscreen();
    } else if (viewerRef.current.mozRequestFullScreen) {
      /* Firefox */
      viewerRef.current.mozRequestFullScreen();
    } else if (viewerRef.current.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      viewerRef.current.webkitRequestFullscreen();
    } else if (viewerRef.current.msRequestFullscreen) {
      /* IE/Edge */
      viewerRef.current.msRequestFullscreen();
    }
  };

  const handleFullscreenChange = () => {
    if (
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
    ) {
      // Fullscreen mode entered
    } else {
      // Fullscreen mode exited
      setShowPPT(false);
    }
  };

  useEffect(() => {
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullscreenChange
      );
    };
  }, []);

  useEffect(() => {
    if (showPPT && viewerRef.current) {
      openFullscreen();
    }
  }, [showPPT]);

  return (
    <div className="text-center">
      <img
        src={`http://localhost:5000/book/${book.image}`}
        alt={book.title}
        style={{ width: "auto", height: "200px" }}
        className="img-thumbnail"
      />

      <h5 className="mt-3">{book.title}</h5>
      {/* <button onClick={() => setShowPPT(true)}>Open PPT</button> */}
      <button
        className="btn btn-primary"
        onClick={() => {
          setShowPPT(true);
        }}
      >
        Open PPT
      </button>
      {showPPT && (
        <div ref={viewerRef} style={{ height: "100vh" }}>
          <DocViewer
            documents={docs}
            pluginRenderers={DocViewerRenderers}
            style={{ height: "100vh" }}
          />
        </div>
      )}
    </div>
  );
};

export default ProjectView;
