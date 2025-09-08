import { useMemo, useState } from "react";
import { Button, Stack, Title, Divider, Container, Text } from "@mantine/core";
import { v4 as uuidv4 } from "uuid";
import AddExpenseModal from "../components/Modal";     
import ItemCard from "../components/ItemCard";         

type Expense = {
  id: string;
  name: string;
  amount: number | string;
  category: string; 
};

const CATEGORIES = ["Food", "Transport", "Entertainment"] as const;

export default function ExpenseTracker() {
  const [opened, setOpened] = useState(false);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const totalCost = useMemo(
    () =>
      expenses.reduce(
        (sum, e) => sum + (Number.isFinite(Number(e.amount)) ? Number(e.amount) : 0),
        0
      ),
    [expenses]
  );
  const totalByCategory = useMemo(() => {
    const acc = { Food: 0, Transport: 0, Entertainment: 0 } as Record<
      (typeof CATEGORIES)[number],
      number
    >;
    for (const e of expenses) {
      const n = Number.isFinite(Number(e.amount)) ? Number(e.amount) : 0;
      if ((CATEGORIES as readonly string[]).includes(e.category)) {
        acc[e.category as (typeof CATEGORIES)[number]] += n;
      }
    }
    return acc;
  }, [expenses]);

  const handleAdd = (name: string, amount: number | string, category: string) => {
    setExpenses((prev) => [
      { id: uuidv4(), name: name.trim(), amount: Number(amount) || 0, category },
      ...prev,
    ]);
    setOpened(false);
  };
  const handleDelete = (id: string) =>
    setExpenses((prev) => prev.filter((e) => e.id !== id));

  return (
    <Container style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <Title order={2} mb="md">
        Expense Tracker
      </Title>

      <Button onClick={() => setOpened(true)} fullWidth>
        Add Expense Item
      </Button>

      <AddExpenseModal
        opened={opened}
        onClose={() => setOpened(false)}
        onAdd={handleAdd}
      />

      <Divider my="md" />

      <Title order={3} mb="xs">
        Total cost: {totalCost.toLocaleString()} Baht
      </Title>

      <Stack my="sm" gap={6}>
        <Text>Food: {totalByCategory.Food.toLocaleString()} Baht</Text>
        <Text>Transport: {totalByCategory.Transport.toLocaleString()} Baht</Text>
        <Text>Entertainment: {totalByCategory.Entertainment.toLocaleString()} Baht</Text>
      </Stack>

      <Divider my="md" />

      <Stack gap="sm" mt="md">
        {expenses.map((e) => (
          <ItemCard
            key={e.id}
            name={e.name}
            amount={e.amount}
            category={e.category}
            onDelete={() => handleDelete(e.id)}
          />
        ))}
        {expenses.length === 0 && (
          <Text c="dimmed">No items yet — click “Add Expense Item”.</Text>
        )}
      </Stack>
    </Container>
  );
}
