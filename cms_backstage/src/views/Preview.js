import React, { useEffect } from "react";

export default function Preview(props) {
  const { router } = props;
  useEffect(() => {
    router(props.location.pathname);
  }, [router,props.location.pathname]);
  return (
    <div style={{ padding: "0 170px 32px 64px" }}>
      <h1
        style={{
          marginTop: "8px",
          marginBottom: "20px",
          fontSize: "30px",
          fontWeight: "500",
        }}
      >
        实时预览
      </h1>
      <iframe
        title="navigation"
        src="https://bowencn.top/"
        name="prive"
        width="100%"
        height="750"
        frameBorder="0"
      ></iframe>
    </div>
  );
}
