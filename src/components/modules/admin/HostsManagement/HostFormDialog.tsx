import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { useEventCategorySelection } from "@/hooks/eventCategoryHook/useEventCategorySelection";

import { EventCategory, IEvent } from "@/types/event.interface";
import Image from "next/image";
import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import EventCategoryMultiSelect from "./EventCategoryMultiSelect";
import { createEvent, updateEvent } from "@/services/admin/eventManagement";

interface IHostFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  event?: IEvent;
}

const HostFormDialog = ({
  open,
  onClose,
  onSuccess,
  event,
}: IHostFormDialogProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isEdit = !!event;

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file || null);
  };

  const [state, formAction, pending] = useActionState(
    isEdit ? updateEvent.bind(null, event.id!) : createEvent,
    null
  );

  const handleClose = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (selectedFile) {
      setSelectedFile(null); // Clear preview
    }
    formRef.current?.reset(); // Clear form
    onClose(); // Close dialog
  };

  // Get all event categories as array of strings
  const allEventCategories = Object.values(EventCategory);

  const eventCategorySelection = useEventCategorySelection({
    event,
    isEdit,
    open,
  });

  const getCategoryTitle = (id: string): string => {
    return id.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
  };

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      if (formRef.current) {
        formRef.current.reset();
      };
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedFile(null);
      onSuccess();
      onClose();
    } else if (state && !state.success) {
      toast.error(state.message);

      if (selectedFile && fileInputRef.current) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(selectedFile);
        fileInputRef.current.files = dataTransfer.files;
      }
    }
  }, [state, onSuccess, onClose, selectedFile]);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>{isEdit ? "Edit Event" : "Add New Event"}</DialogTitle>
        </DialogHeader>

        <form
          ref={formRef}
          action={formAction}
          className="flex flex-col flex-1 min-h-0"
        >          
          <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">
            <Field>
              <FieldLabel htmlFor="eventName">Event Name</FieldLabel>
              <Input
                id="eventName"
                name="eventName"
                placeholder="Tech Conference 2024"
                defaultValue={
                  state?.formData?.eventName || (isEdit ? event?.eventName : "")
                }
              />
              <InputFieldError state={state} field="eventName" />
            </Field>

            <Field>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <Input
                id="description"
                name="description"
                placeholder="A brief description of the event"
                defaultValue={
                  state?.formData?.description || (isEdit ? event?.description : "")
                }
              />
              <InputFieldError state={state} field="description" />
            </Field>

            {/* Event Category Selection - Exactly like SpecialtyMultiSelect */}
            <EventCategoryMultiSelect
              selectedCategoryIds={eventCategorySelection.selectedCategoryIds}
              removedCategoryIds={eventCategorySelection.removedCategoryIds}
              currentCategoryId={eventCategorySelection.currentCategoryId}
              availableCategories={eventCategorySelection.getAvailableCategories(allEventCategories)}
              isEdit={isEdit}
              onCurrentCategoryChange={eventCategorySelection.setCurrentCategoryId}
              onAddCategory={eventCategorySelection.handleAddCategory}
              onRemoveCategory={eventCategorySelection.handleRemoveCategory}
              getCategoryTitle={getCategoryTitle}
              getNewCategories={eventCategorySelection.getNewCategories}
            />

            <Field>
              <FieldLabel htmlFor="date">Event Date & Time</FieldLabel>
              <Input
                id="date"
                name="date"
                type="datetime-local"
                defaultValue={
                  state?.formData?.date || 
                  (isEdit && event?.date ? new Date(event.date).toISOString().slice(0, 16) : "")
                }
              />
              <InputFieldError state={state} field="date" />
            </Field>

            <Field>
              <FieldLabel htmlFor="location">Location</FieldLabel>
              <Input
                id="location"
                name="location"
                placeholder="123 Main St, City, Country"
                defaultValue={
                  state?.formData?.location || (isEdit ? event?.location : "")
                }
              />
              <InputFieldError state={state} field="location" />
            </Field>

            <Field>
              <FieldLabel htmlFor="maxParticipants">Max Participants</FieldLabel>
              <Input
                id="maxParticipants"
                name="maxParticipants"
                type="number"
                placeholder="100"
                defaultValue={
                  state?.formData?.maxParticipants ||
                  (isEdit ? event?.maxParticipants : "")
                }
                min="1"
              />
              <InputFieldError state={state} field="maxParticipants" />
            </Field>

            <Field>
              <FieldLabel htmlFor="minParticipants">Min Participants</FieldLabel>
              <Input
                id="minParticipants"
                name="minParticipants"
                type="number"
                placeholder="10"
                defaultValue={
                  state?.formData?.minParticipants ||
                  (isEdit ? event?.minParticipants : "")
                }
                min="1"
              />
              <InputFieldError state={state} field="minParticipants" />
            </Field>

            <Field>
              <FieldLabel htmlFor="joiningFee">Joining Fee (Optional)</FieldLabel>
              <Input
                id="joiningFee"
                name="joiningFee"
                type="number"
                placeholder="50"
                defaultValue={isEdit ? event?.joiningFee : undefined}
                min="0"
              />
              <InputFieldError state={state} field="joiningFee" />
            </Field>

            {/* Hidden input for hostId - you might want to get this from context or props */}
            <Input
              type="hidden"
              name="hostId"
              value={event?.hostId || ""} // You need to provide this
            />

            {!isEdit && (
              <Field>
                <FieldLabel htmlFor="file">Event Image</FieldLabel>
                  {selectedFile && (
                    <Image
                      src={
                        typeof selectedFile === "string"
                          ? selectedFile
                          : URL.createObjectURL(selectedFile)
                      }
                      alt="Event Image Preview"
                      width={100}
                      height={100}
                      className="mb-2 rounded-lg"
                    />
                  )}
                <Input
                  ref={fileInputRef}
                  id="file"
                  name="file"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Upload an image for the event
                </p>
                <InputFieldError state={state} field="image" />
              </Field>
            )}
          </div>

          <div className="flex justify-end gap-2 px-6 py-4 border-t bg-gray-50">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={pending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={pending}>
              {pending
                ? "Saving..."
                : isEdit
                ? "Update Event"
                : "Create Event"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default HostFormDialog;







