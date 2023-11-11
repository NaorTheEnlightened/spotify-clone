import { ModeToggle } from '@/components/mode-toggle';
import RegisterForm from '@/components/register-form';

function SignUpPage() {
  return (
    <div className="flex-center h-screen">
      <ModeToggle />
      <RegisterForm />
    </div>
  );
}

export default SignUpPage;
