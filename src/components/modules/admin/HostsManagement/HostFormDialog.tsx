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
import { createEvent, updateEvent } from "@/services/admin/eventManagement";
import { createHost, updateHost } from "@/services/admin/hostsManagement";
import { EventCategory, IEvent } from "@/types/event.interface";
import { IHost } from "@/types/host.interface";
import Image from "next/image";
import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface IHostFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  host?: IHost;
}

const HostFormDialog = ({
  open,
  onClose,
  onSuccess,
  host,
}: IHostFormDialogProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isEdit = !!event;
  const isEditHost = !!host;

  const [state, formAction, pending] = useActionState(
    isEdit ? updateHost.bind(null, host?.id as string) : createHost,
    null
  );

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file || null);
  };

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message || "Operation successful"); // Eikhan theke error ta astece repeated toasdt (Admin created successfully)
      if (formRef.current) {
        formRef.current.reset();
      }
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




  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>{isEditHost ? "Edit Host" : "Add New Host"}</DialogTitle>
        </DialogHeader>

        <form
          ref={formRef}
          action={formAction}
          className="flex flex-col flex-1 min-h-0"
        >          
          <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                id="name"
                name="name"
                placeholder="Tech Conference 2024"
                defaultValue={
                  state?.formData?.host?.name || (isEdit ? host?.name : "")
                }
              />
              <InputFieldError state={state} field="eventName" />
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="admin@example.com"
                defaultValue={state?.formData?.email || host?.email || ""}
                disabled={isEdit}
              />
              <InputFieldError field="email" state={state} />
            </Field>

            <Field>
              <FieldLabel htmlFor="contactNumber">Contact Number</FieldLabel>
              <Input
                id="contactNumber"
                name="contactNumber"
                placeholder="A brief contactNumber of the event"
                defaultValue={
                  state?.formData?.contactNumber || (isEdit ? host?.contactNumber : "")
                }
              />
              <InputFieldError state={state} field="contactNumber" />
            </Field>

            <Field>
              <FieldLabel htmlFor="location">Location</FieldLabel>
              <Input
                id="location"
                name="location"
                placeholder="123 Main St, City, Country"
                defaultValue={
                  state?.formData?.location || (isEditHost ? host?.location : "")
                }
              />
              <InputFieldError state={state} field="location" />
            </Field>

            {!isEdit && (
              <Field>
                <FieldLabel htmlFor="file">Host Image</FieldLabel>
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
                : isEditHost
                ? "Update Host"
                : "Create Host"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default HostFormDialog;







