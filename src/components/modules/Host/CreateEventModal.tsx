/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef, useState, useActionState } from 'react';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Field, FieldLabel } from '@/components/ui/field';
import InputFieldError from '@/components/shared/InputFieldError';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Assuming createEvent is your server action
// import { createEvent } from '@/actions/event-actions';

export function CreateEventModal() {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Placeholder action - replace with your actual import
  async function dummyAction(prevState: any, formData: FormData) {
     console.log("Saving event...", formData);
     return { errors: {} };
  }

  const [state, formAction, pending] = useActionState(dummyAction, null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file || null);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-white text-orange-600 hover:bg-orange-50 font-semibold gap-2">
          <Plus size={20} /> Create Event
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Create New Event</DialogTitle>
        </DialogHeader>
        
        <form action={formAction} className="grid gap-6 py-4">
          <Field>
            <FieldLabel htmlFor="eventName">Event Name</FieldLabel>
            <Input id="eventName" name="eventName" placeholder="e.g. Annual Tech Conference" />
            {/* <InputFieldError state={state} field="eventName" /> */}
          </Field>

          <Field>
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <Textarea id="description" name="description" placeholder="Describe..." className="min-h-[100px]" />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field><FieldLabel>Date</FieldLabel><Input name="date" type="date" /></Field>
            <Field><FieldLabel>Time</FieldLabel><Input name="time" type="time" /></Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field><FieldLabel>Max Participants</FieldLabel><Input name="maxParticipants" type="number" /></Field>
            <Field><FieldLabel>Joining Fee ($)</FieldLabel><Input name="joiningFee" type="number" /></Field>
          </div>

          <Field>
            <FieldLabel htmlFor="file">Event Photo</FieldLabel>
            {selectedFile && (
              <div className="relative w-20 h-20 mb-2">
                <Image 
                  src={URL.createObjectURL(selectedFile)} 
                  fill 
                  alt="Preview" 
                  className="rounded-md object-cover" 
                />
              </div>
            )}
            <Input ref={fileInputRef} name="file" type="file" accept="image/*" onChange={handleFileChange} />
          </Field>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={pending} className="bg-orange-600 hover:bg-orange-700">
              {pending ? "Creating..." : "Create Event"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}