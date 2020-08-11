import React,{useEffect} from "react";

export default function Preview(props) {
  useEffect(() => {
    props.router(props.location.pathname);
  }, []);
  return (
    <div>
      <iframe
        title="navigation"
        src="http://bowencn.top/"
        name="prive"
        width="100%"
        height="950"
        frameBorder="0"
      ></iframe>
    </div>
  );
}
