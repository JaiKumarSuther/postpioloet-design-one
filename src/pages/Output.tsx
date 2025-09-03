import { useLocation, Link } from "react-router-dom";
import { Copy, Download, Send, ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Output = () => {
  const location = useLocation();
  const { toast } = useToast();
  const state = location.state as any;

  const blogContent = `# The Future of AI in Content Creation: Transforming Digital Marketing

In today's rapidly evolving digital landscape, artificial intelligence has emerged as a game-changing force in content creation. As businesses struggle to maintain consistent, high-quality content output, AI-powered solutions are revolutionizing how we approach blogging, social media, and digital marketing strategies.

## The Rise of AI Content Creation

The integration of AI in content creation isn't just a trend—it's a fundamental shift in how we produce and consume digital content. With advanced natural language processing capabilities, AI can now generate human-like content that engages audiences while maintaining authenticity and relevance.

### Key Benefits of AI Content Creation:

- **Scalability**: Generate multiple pieces of content simultaneously
- **Consistency**: Maintain brand voice across all platforms
- **SEO Optimization**: Automatically incorporate relevant keywords
- **Time Efficiency**: Reduce content creation time by up to 80%
- **Data-Driven Insights**: Leverage analytics for better performance

## Transforming Business Workflows

Modern businesses are discovering that AI content creation tools can significantly streamline their marketing workflows. From blog posts to social media updates, AI can handle routine content tasks while allowing human creators to focus on strategy and creativity.

The technology behind these tools continues to advance, offering more sophisticated understanding of context, tone, and audience preferences. This evolution means that AI-generated content is becoming increasingly indistinguishable from human-written material.

## Best Practices for AI Content Implementation

To maximize the benefits of AI content creation, businesses should consider the following strategies:

1. **Define Clear Guidelines**: Establish brand voice and content standards
2. **Human Oversight**: Always review and edit AI-generated content
3. **Audience Testing**: Continuously test content performance with your audience
4. **Integration Strategy**: Seamlessly blend AI tools with existing workflows

## The Future Outlook

As we look ahead, the future of AI in content creation appears incredibly promising. Emerging technologies will likely bring even more sophisticated capabilities, including better emotional intelligence, cultural awareness, and personalization features.

The businesses that embrace these tools today will have a significant competitive advantage tomorrow. By investing in AI content creation now, companies can build scalable content strategies that grow with their business needs.

## Conclusion

AI content creation represents a paradigm shift in how we approach digital marketing and content strategy. While the technology continues to evolve, its current capabilities already offer substantial benefits for businesses looking to scale their content efforts efficiently.

The key to success lies in finding the right balance between AI automation and human creativity. By leveraging the strengths of both, businesses can create compelling, authentic content that resonates with their audiences while maintaining operational efficiency.

*This blog post was generated using advanced AI technology, demonstrating the quality and coherence possible with modern content creation tools.*`;

  const handleCopy = () => {
    navigator.clipboard.writeText(blogContent);
    toast({ title: "Copied to Clipboard", description: "Blog content has been copied to your clipboard." });
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([blogContent], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "ai-generated-blog.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast({ title: "Download Started", description: "Your blog content is being downloaded." });
  };

  const handlePublish = () => {
    toast({ title: "Publishing Blog", description: "Your blog post is being published to your connected platforms." });
  };

  const handleSendToWebsite = () => {
    toast({ title: "Sending to Website", description: "Content is being sent to your website CMS." });
  };

  return (
    <div className="min-h-screen relative overflow-hidden pt-20 pb-16">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-glow opacity-40"></div>
      <div className="absolute -top-28 -left-28 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-28 -right-28 w-80 h-80 bg-purple-primary/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 max-w-6xl relative">
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <div className="flex items-center gap-4">
            <Link to="/blog-writer" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="w-5 h-5" />
              Back to Writer
            </Link>
            <div className="h-6 w-px bg-border"></div>
            <img src="/assets/postpilot-logo.png" alt="PostPilot.AI" className="w-40 rounded" />
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

        {state && (
          <div className="card-gradient rounded-xl p-6 mb-8 animate-fade-in shadow-glow">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Generation Details</h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Method:</span>
                <div className="font-medium capitalize">
                  {state.selectedOption === "website" && "Website Analysis"}
                  {state.selectedOption === "custom" && "Custom Topic"}
                  {state.selectedOption === "trending" && "Trending Topic"}
                </div>
              </div>
              {state.websiteUrl && (
                <div>
                  <span className="text-muted-foreground">Source URL:</span>
                  <div className="font-medium truncate">{state.websiteUrl}</div>
                </div>
              )}
              {state.customTopic && (
                <div>
                  <span className="text-muted-foreground">Topic:</span>
                  <div className="font-medium">{state.customTopic}</div>
                </div>
              )}
              {state.selectedTrend && (
                <div>
                  <span className="text-muted-foreground">Trending Topic:</span>
                  <div className="font-medium">{state.selectedTrend}</div>
                </div>
              )}
              {state.category && (
                <div>
                  <span className="text-muted-foreground">Category:</span>
                  <div className="font-medium">{state.category}</div>
                </div>
              )}
              {state.region && (
                <div>
                  <span className="text-muted-foreground">Region:</span>
                  <div className="font-medium">{state.region}</div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="card-gradient rounded-2xl p-8 animate-fade-in shadow-glow">
              <div className="prose prose-invert max-w-none">
                <div className="text-foreground leading-relaxed" style={{ whiteSpace: 'pre-line' }}>{blogContent}</div>
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
                <Button onClick={handleSendToWebsite} variant="outline" className="w-full justify-start border-border hover:border-primary hover:bg-primary/10">
                  <Send className="w-4 h-4 mr-2" />
                  Send to Website
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

      {/* Floating helper badge */}
      <div className="hidden md:flex items-center gap-2 fixed bottom-6 right-6 px-3 py-2 rounded-full bg-primary/15 text-primary text-xs shadow-glow">
        <Sparkles className="w-4 h-4" /> Tip: Use the buttons on the right to export
      </div>
    </div>
  );
};

export default Output;
