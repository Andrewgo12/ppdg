"use client"

import { Clock, MapPin, User } from "lucide-react"

interface EventProps {
  title: string
  date: string
  time: string
  location: string
  organizer?: string
  capacity?: string
  attendees?: number
  image?: string
  status?: "upcoming" | "ongoing" | "finished"
  onClick?: () => void
}

const STATUS_LABEL = {
  upcoming: "Próximo",
  ongoing: "En curso",
  finished: "Finalizado",
}

const STATUS_COLOR = {
  upcoming: "bg-primary/10 text-primary",
  ongoing: "bg-accent/10 text-accent",
  finished: "bg-muted text-muted-foreground",
}

export function EventCard({ title, date, time, location, organizer, capacity, image, status = "upcoming", onClick }: EventProps) {
  return (
    <button
      onClick={onClick}
      className="w-full overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary hover:shadow-md text-left"
    >
      {image && (
        <div className="h-32 w-full overflow-hidden bg-muted">
          <img src={image} alt={title} className="h-full w-full object-cover" />
        </div>
      )}
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          {status && (
            <span className={`whitespace-nowrap rounded-full px-2 py-1 text-xs font-medium ${STATUS_COLOR[status]}`}>
              {STATUS_LABEL[status]}
            </span>
          )}
        </div>

        <div className="mt-3 space-y-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="size-4" />
            <span>{date} · {time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="size-4" />
            <span>{location}</span>
          </div>
          {organizer && (
            <div className="flex items-center gap-2">
              <User className="size-4" />
              <span>{organizer}</span>
            </div>
          )}
          {capacity && (
            <p className="text-xs">{capacity}</p>
          )}
        </div>
      </div>
    </button>
  )
}
