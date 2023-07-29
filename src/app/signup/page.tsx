import SignupFormComp from "@/components/views/SignUpForm";
import ContextWrapper from "@/global/context";


const SignupForm = () => {
    return (
        <ContextWrapper>
            <SignupFormComp />
        </ContextWrapper>
    );
};

export default SignupForm;