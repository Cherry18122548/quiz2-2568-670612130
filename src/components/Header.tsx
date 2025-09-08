import {
  Burger,
  Text,
  useMantineColorScheme,
  Group,
  ActionIcon,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconSun, IconMoon, IconCurrencyBaht } from "@tabler/icons-react";

interface HeaderComponentProps {
  opened: boolean;
  toggle: () => void;
}

export default function HeaderComponent({ opened, toggle }: HeaderComponentProps) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";
  const isMobile = useMediaQuery("(max-width: 768px)");
  const accentColor = isDark ? "yellow" : "blue";
  const iconSize = 20;

  return (
    <Group p="md" justify="space-between">
      <Group>
        {isMobile && (
          <Burger
            opened={opened}
            onClick={toggle}
            aria-label="Toggle navigation"
          />
        )}

        <Group gap="xs" align="center">
          <Text
            size="xl"
            fw={900}
            variant="gradient"
            gradient={{ from: "red", to: "blue", deg: 90 }}
          >
            TRACKER-APP
          </Text>
          <ActionIcon
            variant="filled"
            color={accentColor}
            size="lg"
            aria-hidden="true"
            tabIndex={-1}
            title="Currency"
          >
            <IconCurrencyBaht size={iconSize} />
          </ActionIcon>
        </Group>
      </Group>

      <Group gap={5}>
        <ActionIcon
          variant="filled"
          color={accentColor}
          onClick={toggleColorScheme}
          size="lg"
          aria-label={isDark ? "Light mode" : "Dark mode"}
        >
          {isDark ? <IconSun size={iconSize} /> : <IconMoon size={iconSize} />}
        </ActionIcon>
      </Group>
    </Group>
  );
}
