import { useState } from "react";
import {
  Modal,
  TextInput,
  NumberInput,
  Select,
  Button,
  Stack,
  Group,
} from "@mantine/core";

type AddExpenseModalProps = {
  opened: boolean;
  onClose: () => void;
  onAdd: (name: string, amount: number | string, category: string) => void;
};

export default function AddExpenseModal({
  opened,
  onClose,
  onAdd,
}: AddExpenseModalProps) {
  const [name, setName] = useState<string>("");
  const [amount, setAmount] = useState<number | string>(0);
  const [category, setCategory] = useState<string | null>(null);

  // error states
  const [nameError, setNameError] = useState<string | null>(null);
  const [amountError, setAmountError] = useState<string | null>(null);
  const [categoryError, setCategoryError] = useState<string | null>(null);

  const reset = () => {
    setName("");
    setAmount(0);
    setCategory(null);
    setNameError(null);
    setAmountError(null);
    setCategoryError(null);
  };

  const handleSubmit = () => {
    let ok = true;
    if (!name.trim()) {
      setNameError("Expense Name is required");
      ok = false;
    } else setNameError(null);

    const num = Number(amount);
    if (amount === "" || Number.isNaN(num) || num < 0) {
      setAmountError("Amount is required");
      ok = false;
    } else setAmountError(null);

    if (!category) {
      setCategoryError("Category is required");
      ok = false;
    } else setCategoryError(null);

    if (!ok) return;

    onAdd(name.trim(), num, category!);
    reset();
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={() => {
        reset();
        onClose();
      }}
      title="Add Expense"
      centered
    >
      <Stack>
        <TextInput
          label="Expense Name"
          placeholder="e.g., Lunch"
          withAsterisk
          value={name}
          onChange={(e) => {
            setName(e.currentTarget.value);
            if (nameError) setNameError(null);
          }}
          error={nameError}
        />

        <NumberInput
          label="Amount"
          placeholder="0"
          withAsterisk
          min={0}
          clampBehavior="strict"
          value={amount}
          onChange={(v) => {
            // v: number | string | null
            setAmount(typeof v === "number" ? v : v ?? "");
            if (amountError) setAmountError(null);
          }}
          error={amountError}
        />

        <Select
          label="Category"
          placeholder="Pick one"
          withAsterisk
          data={["Food", "Transport", "Entertainment"]}
          value={category}
          onChange={(v) => {
            setCategory(v);
            if (categoryError) setCategoryError(null);
          }}
          error={categoryError}
        />

        <Group justify="flex-end" mt="xs">
          <Button
            variant="default"
            onClick={() => {
              reset();
              onClose();
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Add</Button>
        </Group>
      </Stack>
    </Modal>
  );
}
