
'use client';

import * as React from 'react';
import { Bot, Loader2, Send, Sparkles, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { answerSpiritualQuery, type AnswerSpiritualQueryInput } from '@/ai/flows/answer-spiritual-queries';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const examplePrompts = [
    "What is Maya in Vedanta?",
    "Explain Bhakti vs. Karma Yoga.",
    "A story about Ramana Maharshi.",
    "How do I practice Self-Enquiry?",
];

export default function AiAssistantPage() {
  const [query, setQuery] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [conversation, setConversation] = React.useState<Message[]>([]);
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent, prompt?: string) => {
    e.preventDefault();
    const currentQuery = prompt || query;
    if (!currentQuery.trim() || loading) return;

    setLoading(true);
    
    // Add user message to conversation
    setConversation(prev => [...prev, { role: 'user', content: currentQuery }]);
    
    try {
      const input: AnswerSpiritualQueryInput = { query: currentQuery };
      // Add a placeholder for the assistant's response
      setConversation(prev => [...prev, { role: 'assistant', content: '...' }]);
      
      const result = await answerSpiritualQuery(input);
      
      // Update the assistant's message with the actual response
      setConversation(prev => {
          const newConversation = [...prev];
          const lastMessageIndex = newConversation.length - 1;
          if (newConversation[lastMessageIndex].role === 'assistant') {
              newConversation[lastMessageIndex].content = result.answer;
          }
          return newConversation;
      });

    } catch (error) {
      console.error("Error fetching AI response:", error);
      // Update the assistant's message with an error
       setConversation(prev => {
          const newConversation = [...prev];
          const lastMessageIndex = newConversation.length - 1;
          if (newConversation[lastMessageIndex].role === 'assistant') {
              newConversation[lastMessageIndex].content = "Sorry, I encountered an error. Please try again.";
          }
          return newConversation;
      });
    } finally {
      setLoading(false);
      setQuery('');
    }
  };

  React.useEffect(() => {
    // Scroll to the bottom of the conversation when new messages are added
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [conversation]);


  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-10rem)] flex flex-col">
        <div className="text-center mb-8">
            <Bot className="h-12 w-12 text-primary mx-auto mb-4" />
            <h1 className="text-4xl font-headline font-bold">AI Spiritual Assistant</h1>
            <p className="text-lg text-muted-foreground mt-2">
                Ask a question about the teachings, lives, and stories of the great masters.
            </p>
        </div>

        <Card className="flex-1 flex flex-col">
            <CardContent ref={scrollAreaRef} className="p-6 flex-1 overflow-y-auto space-y-6">
                {conversation.length === 0 ? (
                    <div className="text-center text-muted-foreground h-full flex flex-col justify-center items-center">
                        <Sparkles className="h-8 w-8 mb-4" />
                        <p className="font-semibold">Start a conversation or try an example prompt.</p>
                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg w-full">
                            {examplePrompts.map((prompt, i) => (
                                <Button 
                                    key={i} 
                                    variant="outline" 
                                    className="text-left h-auto whitespace-normal"
                                    onClick={(e) => handleSubmit(e, prompt)}
                                    disabled={loading}
                                >
                                    {prompt}
                                </Button>
                            ))}
                        </div>
                    </div>
                ) : (
                    conversation.map((message, index) => (
                        <div key={index} className={cn("flex items-start gap-4", message.role === 'user' ? 'justify-end' : 'justify-start')}>
                            {message.role === 'assistant' && (
                                <Avatar className="h-8 w-8 bg-primary/20 text-primary flex items-center justify-center">
                                    <Bot className="h-5 w-5" />
                                </Avatar>
                            )}
                            <div className={cn("max-w-lg p-3 rounded-lg", message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary')}>
                                {message.content === '...' ? <Loader2 className="animate-spin" /> : <p className="whitespace-pre-wrap">{message.content}</p>}
                            </div>
                            {message.role === 'user' && (
                               <Avatar className="h-8 w-8">
                                    <AvatarFallback><User /></AvatarFallback>
                               </Avatar>
                            )}
                        </div>
                    ))
                )}
            </CardContent>
            
            <div className="p-4 border-t">
                <form onSubmit={handleSubmit} className="flex items-center gap-3">
                    <Textarea
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Ask about Vedanta, a guru's life, or a specific teaching..."
                        className="flex-1 resize-none"
                        rows={1}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSubmit(e);
                            }
                        }}
                    />
                    <Button type="submit" disabled={loading || !query.trim()} size="icon">
                        {loading ? <Loader2 className="animate-spin" /> : <Send />}
                        <span className="sr-only">Send</span>
                    </Button>
                </form>
            </div>
        </Card>
    </div>
  );
}
