import { Card, Group, Badge, ActionIcon, Text } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

export default function ItemCard({
  name, amount, category, onDelete,
}: {
  name: string; amount: number | string; category: string; onDelete: () => void;
}) {
  return (
    <Card withBorder radius="md" shadow="xs" p="md">
      <Group justify="space-between" align="center">
        <div>
          <Group gap="sm" align="baseline">
            <Text fw={600} size="lg">{name}</Text>
            <Text c="dimmed" size="sm">
              {Number(amount).toLocaleString()} Baht
            </Text>
          </Group>
          <Group gap="xs" mt={6}>
            <Badge variant="light" color="blue" tt="uppercase">
              {category}
            </Badge>
            <ActionIcon
              variant="light"
              color="pink"
              radius="xl"
              onClick={onDelete}
              aria-label="Delete"
              title="Delete"
            >
              <IconTrash size={16} />
            </ActionIcon>
          </Group>
        </div>
      </Group>
    </Card>
  );
}
