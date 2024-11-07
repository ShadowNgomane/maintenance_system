"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ErrorBoundary } from "react-error-boundary"

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert" className="p-4 bg-red-100 text-red-700 rounded-md">
      <p>Something went wrong:</p>
      <pre className="text-sm">{error.message}</pre>
      <button onClick={resetErrorBoundary} className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
        Try again
      </button>
    </div>
  )
}

function LanguageSettingsForm() {
  const [language, setLanguage] = useState("en")
  const [dateFormat, setDateFormat] = useState("mm-dd-yy")
  const [currency, setCurrency] = useState("")
  const [timezone, setTimezone] = useState("africa-johannesburg")

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Language & Region</h1>

      <Card className="p-6">
        <div className="grid gap-6">
          <div className="grid gap-8 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="language" className="text-sm font-medium">
                Language
              </label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger id="language">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                  <SelectItem value="pt">Portuguese</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="date-format" className="text-sm font-medium">
                Date Format
              </label>
              <Select value={dateFormat} onValueChange={setDateFormat}>
                <SelectTrigger id="date-format">
                  <SelectValue placeholder="Select date format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mm-dd-yy">MM/DD/YY</SelectItem>
                  <SelectItem value="dd-mm-yy">DD/MM/YY</SelectItem>
                  <SelectItem value="yy-mm-dd">YY/MM/DD</SelectItem>
                  <SelectItem value="month-dd-yy">Month DD, YY</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="currency" className="text-sm font-medium">
              Currency
            </label>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger id="currency">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usd">US Dollar (USD)</SelectItem>
                <SelectItem value="eur">Euro (EUR)</SelectItem>
                <SelectItem value="gbp">British Pound (GBP)</SelectItem>
                <SelectItem value="jpy">Japanese Yen (JPY)</SelectItem>
                <SelectItem value="zar">South African Rand (ZAR)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="timezone" className="text-sm font-medium">
              Time Zone
            </label>
            <Select value={timezone} onValueChange={setTimezone}>
              <SelectTrigger id="timezone">
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="africa-johannesburg">Africa/Johannesburg +02:00 SAST</SelectItem>
                <SelectItem value="america-new_york">America/New_York -05:00 EST</SelectItem>
                <SelectItem value="asia-tokyo">Asia/Tokyo +09:00 JST</SelectItem>
                <SelectItem value="europe-london">Europe/London +00:00 GMT</SelectItem>
                <SelectItem value="pacific-auckland">Pacific/Auckland +13:00 NZDT</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default function Component() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <LanguageSettingsForm />
    </ErrorBoundary>
  )
}