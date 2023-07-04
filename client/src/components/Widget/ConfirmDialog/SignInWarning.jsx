import SignInPic from "../../../images/dabengou/SignInPic.jpg";
import Warning from "./Warning";
const SignInWarning = () => {
  return <Warning text="Please log in first!" pic={SignInPic} page="/auth" />;
};

export default SignInWarning;
