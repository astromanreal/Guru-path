
"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Monitor, Moon, Sun, Landmark, ArrowRight } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { gurus } from "@/lib/data"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useChosenGuru } from "@/components/providers/chosen-guru-provider"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const { selectedGuruId, setSelectedGuruId } = useChosenGuru()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const selectedGuru = gurus.find(g => g.id === selectedGuruId)

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-headline font-bold">Customize Your Experience</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Personalize the look, feel, and rhythm of your spiritual journey.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Choose Your Guru</CardTitle>
          <CardDescription>
            Select a master to personalize your app experience. Their wisdom will be highlighted for you.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Select onValueChange={setSelectedGuruId} value={selectedGuruId || undefined}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a Master..." />
            </SelectTrigger>
            <SelectContent>
              {gurus.map(guru => (
                <SelectItem key={guru.id} value={guru.id}>
                  {guru.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {selectedGuru && (
            <div className="border rounded-lg p-4 animate-in fade-in-50 space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedGuru.media.images[0].url} alt={selectedGuru.name} />
                  <AvatarFallback>{selectedGuru.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-headline font-bold">{selectedGuru.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedGuru.title}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-3">{selectedGuru.description}</p>
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-muted-foreground pt-3 text-xs">
                <span>{selectedGuru.lifespan}</span>
                  {selectedGuru.birthplace && (
                    <span className="flex items-center gap-1.5"><Landmark className="h-3 w-3" /> {selectedGuru.birthplace}</span>
                  )}
              </div>
              <div className="pt-2">
                <Button asChild variant="secondary" className="w-full">
                  <Link href={`/gurus/${selectedGuru.id}`}>View Profile <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>
            Select the theme for the application.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {mounted && (
            <RadioGroup
              value={theme}
              onValueChange={setTheme}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
              <Label className="border cursor-pointer rounded-lg p-4 flex flex-col items-center justify-center gap-2 transition-colors hover:bg-accent/50 [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/10">
                <RadioGroupItem value="light" className="sr-only" />
                <Sun className="h-8 w-8 text-primary" />
                <span className="font-medium">Light</span>
              </Label>

              <Label className="border cursor-pointer rounded-lg p-4 flex flex-col items-center justify-center gap-2 transition-colors hover:bg-accent/50 [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/10">
                <RadioGroupItem value="dark" className="sr-only" />
                <Moon className="h-8 w-8 text-primary" />
                <span className="font-medium">Dark</span>
              </Label>
              
              <Label className="border cursor-pointer rounded-lg p-4 flex flex-col items-center justify-center gap-2 transition-colors hover:bg-accent/50 [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/10">
                <RadioGroupItem value="system" className="sr-only" />
                <Monitor className="h-8 w-8 text-primary" />
                <span className="font-medium">System</span>
              </Label>
            </RadioGroup>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
            <CardTitle>About This App</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
            <p><span className="font-semibold text-foreground">Version:</span> 1.0.0</p>
            <p><span className="font-semibold text-foreground">Key Features:</span></p>
            <ul className="list-disc pl-5 space-y-1">
                <li>Explore the lives, teachings, and lineages of great spiritual masters.</li>
                <li>Discover sacred stories and timeless anecdotes.</li>
                <li>Bookmark your favorite gurus, teachings, and stories.</li>
                <li>Ask questions to an AI assistant trained on spiritual wisdom.</li>
            </ul>
        </CardContent>
      </Card>
    </div>
  )
}
