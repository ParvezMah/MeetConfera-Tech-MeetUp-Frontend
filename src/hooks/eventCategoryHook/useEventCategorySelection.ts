// hooks/eventCategoryHooks/useEventCategorySelection.ts
import { IEvent } from "@/types/event.interface";
import { useEffect, useState } from "react";

interface UseEventCategorySelectionProps {
    event?: IEvent;
    isEdit: boolean;
    open: boolean;
}

interface UseEventCategorySelectionReturn {
    selectedCategoryIds: string[];
    removedCategoryIds: string[];
    currentCategoryId: string;
    setCurrentCategoryId: (id: string) => void;
    handleAddCategory: () => void;
    handleRemoveCategory: (id: string) => void;
    getNewCategories: () => string[];
    getAvailableCategories: (allCategories: string[]) => string[];
}

export const useEventCategorySelection = ({
    event,
    isEdit,
    open,
}: UseEventCategorySelectionProps): UseEventCategorySelectionReturn => {

    const getInitialCategoryIds = () => {
        if (isEdit && event?.category) {
            // Since event has single category field, convert to array
            return [event.category];
        }
        return [];
    };

    const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>(getInitialCategoryIds);
    const [removedCategoryIds, setRemovedCategoryIds] = useState<string[]>([]);
    const [currentCategoryId, setCurrentCategoryId] = useState<string>("");

    const handleAddCategory = () => {
        if (
            currentCategoryId &&
            !selectedCategoryIds.includes(currentCategoryId)
        ) {
            setSelectedCategoryIds([...selectedCategoryIds, currentCategoryId]);
            // If in edit mode and we're re-adding a removed category
            if (removedCategoryIds.includes(currentCategoryId)) {
                setRemovedCategoryIds(
                    removedCategoryIds.filter((id) => id !== currentCategoryId)
                );
            }
            setCurrentCategoryId("");
        }
    };

    const handleRemoveCategory = (categoryId: string) => {
        setSelectedCategoryIds(
            selectedCategoryIds.filter((id) => id !== categoryId)
        );

        // In edit mode, track removed categories
        if (isEdit && event?.category) {
            const wasOriginalCategory = event.category === categoryId;
            if (wasOriginalCategory && !removedCategoryIds.includes(categoryId)) {
                setRemovedCategoryIds([...removedCategoryIds, categoryId]);
            }
        }
    };

    const getNewCategories = (): string[] => {
        if (!isEdit || !event?.category) {
            return selectedCategoryIds;
        }
        const originalIds = event.category ? [event.category] : [];
        return selectedCategoryIds.filter((id) => !originalIds.includes(id));
    };

    const getAvailableCategories = (allCategories: string[]) => {
        return allCategories?.filter((c) => !selectedCategoryIds?.includes(c)) || [];
    };

    useEffect(() => {
        if (open && event) {
            const initialIds = getInitialCategoryIds();
            setSelectedCategoryIds(initialIds);
            setRemovedCategoryIds([]);
            setCurrentCategoryId("");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, event?.id]);

    return {
        selectedCategoryIds,
        removedCategoryIds,
        currentCategoryId,
        setCurrentCategoryId,
        handleAddCategory,
        handleRemoveCategory,
        getNewCategories,
        getAvailableCategories,
    };
};
