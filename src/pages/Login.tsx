import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Footprints, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { ENDPOINTS } from "@/lib/endpoints";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Forgot Password States
  const [view, setView] = useState<"login" | "forgot" | "reset">("login");
  const [resetEmail, setResetEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (view === "login") {
      try {
        const response = await fetch(ENDPOINTS.LOGIN, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Login failed");
        }

        localStorage.setItem("token", data.token);
        localStorage.setItem("admin", JSON.stringify(data.admin));
        toast({ title: "Login successful", description: "Welcome back!" });
        navigate("/", { replace: true });
      } catch (error: any) {
        toast({ title: "Login failed", description: error.message, variant: "destructive" });
      }
    } else if (view === "forgot") {
      try {
        // Assuming ENDPOINTS.LOGIN is like .../api/admin/login
        const url = ENDPOINTS.forgotPassword;
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: resetEmail }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to send OTP");
        
        toast({ title: "OTP Sent", description: "Check your email for the OTP." });
        setView("reset");
      } catch (error: any) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      }
    } else if (view === "reset") {
      try {
        const url = ENDPOINTS.resetPassword;
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: resetEmail, otp, newPassword }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to reset password");

        toast({ title: "Success", description: "Password reset successfully. Please login." });
        setView("login");
        setResetEmail("");
        setOtp("");
        setNewPassword("");
      } catch (error: any) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Footprints className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold font-heading">
            {view === "login" ? "Welcome Back" : view === "forgot" ? "Forgot Password" : "Reset Password"}
          </CardTitle>
          <CardDescription>
            {view === "login" ? "Sign in to your admin panel" : view === "forgot" ? "Enter your email to receive an OTP" : "Enter OTP and new password"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {view === "login" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <button
                      type="button"
                      onClick={() => setView("forgot")}
                      className="text-sm text-primary hover:underline font-medium"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>
              </>
            )}

            {view === "forgot" && (
              <div className="space-y-2">
                <Label htmlFor="reset-email">Email Address</Label>
                <Input
                  id="reset-email"
                  type="email"
                  placeholder="Enter your registered email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  required
                />
              </div>
            )}

            {view === "reset" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="otp">OTP Code</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    maxLength={6}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <div className="relative">
                    <Input
                      id="new-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      minLength={6}
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>
              </>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Please wait..." : view === "login" ? "Sign In" : view === "forgot" ? "Send OTP" : "Reset Password"}
            </Button>

            {view !== "login" && (
              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => setView("login")}
                disabled={loading}
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Login
              </Button>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
