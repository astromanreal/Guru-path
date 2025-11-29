import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Instagram, Mail, Phone, Twitter } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-headline font-bold">Get in Touch</h1>
        <p className="text-lg text-muted-foreground mt-2">
          We&apos;re here to help and answer any question you might have. We look forward to hearing from you.
        </p>
      </div>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-headline text-center mb-6">Direct Contact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline"><Mail /> Email Us</CardTitle>
                <CardDescription>astroman6569@gmail.com</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">For inquiries, support, or feedback, drop us an email.</p>
                <Button asChild>
                  <Link href="mailto:astroman6569@gmail.com">Send Email</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline"><Phone /> Call Us</CardTitle>
                <CardDescription>+91 8102116569</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Speak to us directly for immediate assistance during business hours.</p>
                <Button asChild>
                  <Link href="tel:+918102116569">Call Now</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-headline text-center mb-6">Connect Online</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                  Twitter / X
                </CardTitle>
                <CardDescription>@Sathyamsarthak</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline">
                  <Link href="https://x.com/Sathyamsarthak" target="_blank">Follow on X</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline"><Instagram /> Instagram</CardTitle>
                <CardDescription>@srishikharji</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline">
                  <Link href="https://instagram.com/srishikharji" target="_blank">Follow on Instagram</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline"><Github /> GitHub</CardTitle>
                <CardDescription>astromanreal</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline">
                  <Link href="https://github.com/astromanreal" target="_blank">Follow on GitHub</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
