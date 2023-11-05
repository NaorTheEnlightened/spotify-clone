import AuthModal from './components/AuthModal';
export default function Home() {
  return (
    <div className="flex-center min-h-screen flex-col bg-[url('/images/auth-background.png')]">
      <AuthModal />
    </div>
  );
}
