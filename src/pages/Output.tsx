import { useLocation, Link } from "react-router-dom";
import { Copy, Download, Send, ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Suspense } from "react";
import ThreeBackground from "@/components/ThreeBackground";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogAction } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { usePublishPost } from "@/hooks/useApi";

const Output = () => {
  const location = useLocation();
  const { toast } = useToast();
  const state = location.state as any;
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const { blog, params } = useSelector((s: RootState) => s.generation);
  const { mutateAsync: publish, isPending: isPublishing } = usePublishPost();

  const blogContent = useMemo(() => (blog?.content ? blog.content : ""), [blog]);

  const handleCopy = () => {
    navigator.clipboard.writeText(blogContent || "");
    toast({ title: "Copied to Clipboard", description: "Blog content has been copied to your clipboard." });
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([blogContent || ""], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "ai-generated-blog.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast({ title: "Download Started", description: "Your blog content is being downloaded." });
  };

  const handlePublish = () => {
    setOpen(true);
  };

  const handleSubmitContact = () => {
    if (!email || !phone) {
      toast({ title: "Missing details", description: "Please enter your email and contact number.", variant: "destructive" });
      return;
    }
    setOpen(false);
    setEmail("");
    setPhone("");
    setConfirmOpen(true);
  };

  const handleSendToWebsite = async () => {
    if (!blog) {
      toast({ title: "No content", description: "Please generate a blog first.", variant: "destructive" });
      return;
    }
    try {
      await publish(blog);
      toast({ title: "Published", description: "Post published successfully." });
    } catch (e: any) {
      toast({ title: "Publish failed", description: e?.message ?? "Please try again.", variant: "destructive" });
    }
  };

  const isLocalhost = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

  return (
    <div className={`min-h-screen relative overflow-hidden pt-20 pb-16${isLocalhost ? ' bg-black' : ''}`}>
      {/* Animated Three.js background */}
      {!isLocalhost && (
        <Suspense fallback={<div className="fixed inset-0 bg-background -z-10" />}> 
          <ThreeBackground />
        </Suspense>
      )}

      {/* Subtle overlays */}
      {!isLocalhost && <div className="absolute inset-0 bg-gradient-glow opacity-60"></div>}
      {!isLocalhost && <div className="absolute -top-28 -left-28 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>}
      {!isLocalhost && <div className="absolute -bottom-28 -right-28 w-80 h-80 bg-purple-primary/10 rounded-full blur-3xl"></div>}

      <div className="container mx-auto px-6 max-w-6xl relative">
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <div className="flex items-center gap-4">
            <Link to="/blog-writer" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="w-5 h-5" />
              Back to Writer
            </Link>
            <div className="h-6 w-px bg-border"></div>
            <h1 className="text-3xl font-bold">Your <span className="gradient-text">AI-Generated</span> Blog</h1>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs">
            <span className="px-2 py-1 bg-primary/15 text-primary rounded-full">Draft</span>
            <span className="px-2 py-1 bg-purple-primary/15 text-purple-primary rounded-full">SEO 92</span>
          </div>
        </div>

        <div className="flex justify-center mb-8 animate-fade-in">
          <Button onClick={handlePublish} className="button-gradient px-12 py-4 text-xl font-semibold text-primary-foreground hover:scale-105 transition-all glow-primary">
            <Send className="w-6 h-6 mr-3" />
            Publish Blog Post
          </Button>
        </div>

        {params && (
          <div className="card-gradient rounded-xl p-6 mb-8 animate-fade-in shadow-glow">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Generation Details</h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Method:</span>
                <div className="font-medium capitalize">
                  {params.selectedOption === "website" && "Website Analysis"}
                  {params.selectedOption === "custom" && "Custom Topic"}
                  {params.selectedOption === "trending" && "Trending Topic"}
                </div>
              </div>
              {params.websiteUrl && (
                <div>
                  <span className="text-muted-foreground">Source URL:</span>
                  <div className="font-medium truncate">{params.websiteUrl}</div>
                </div>
              )}
              {params.customTopic && (
                <div>
                  <span className="text-muted-foreground">Topic:</span>
                  <div className="font-medium">{params.customTopic}</div>
                </div>
              )}
              {params.selectedTrend && (
                <div>
                  <span className="text-muted-foreground">Trending Topic:</span>
                  <div className="font-medium">{params.selectedTrend}</div>
                </div>
              )}
              {params.category && (
                <div>
                  <span className="text-muted-foreground">Category:</span>
                  <div className="font-medium">{params.category}</div>
                </div>
              )}
              {params.region && (
                <div>
                  <span className="text-muted-foreground">Region:</span>
                  <div className="font-medium">{params.region}</div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="card-gradient rounded-2xl p-8 animate-fade-in shadow-glow">
              <div className="prose prose-invert max-w-none">
                {blogContent ? (
                  <div className="text-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: blogContent }} />
                ) : (
                  <div className="text-muted-foreground">No content generated yet.</div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="card-gradient rounded-2xl p-6 sticky top-24 animate-fade-in shadow-glow">
              <h3 className="text-lg font-semibold mb-6">Quick Actions</h3>
              <div className="space-y-4">
                <Button onClick={handleCopy} variant="outline" className="w-full justify-start border-border hover:border-primary hover:bg-primary/10">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Text
                </Button>
                <Button onClick={handleDownload} variant="outline" className="w-full justify-start border-border hover:border-primary hover:bg-primary/10">
                  <Download className="w-4 h-4 mr-2" />
                  Download as .txt
                </Button>
                <Button onClick={handleSendToWebsite} variant="outline" disabled={isPublishing || !blog} className="w-full justify-start border-border hover:border-primary hover:bg-primary/10 disabled:opacity-60">
                  <Send className="w-4 h-4 mr-2" />
                  {isPublishing ? "Publishing..." : "Send to Website"}
                </Button>
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <h4 className="font-semibold mb-3">Content Stats</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex justify-between"><span>Word Count:</span><span className="text-foreground">~850</span></div>
                  <div className="flex justify-between"><span>Reading Time:</span><span className="text-foreground">3-4 min</span></div>
                  <div className="flex justify-between"><span>SEO Score:</span><span className="text-green-400">92/100</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-2 fixed bottom-6 right-6 px-3 py-2 rounded-full bg-primary/15 text-primary text-xs shadow-glow ">
        <Sparkles className="w-4 h-4" /> Tip: Use the buttons on the right to export
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Publish Blog Post</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Contact Number</Label>
              <Input id="phone" type="tel" placeholder="e.g. +1 555 123 4567" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setOpen(false)} variant="outline">Cancel</Button>
            <Button onClick={handleSubmitContact}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Request Received</AlertDialogTitle>
            <AlertDialogDescription>
              R Tech Team will react you soon to integrate this blog to your website
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-end">
            <AlertDialogAction onClick={() => setConfirmOpen(false)}>OK</AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Output;
