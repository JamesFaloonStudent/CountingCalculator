import { usePathname, useRouter } from "expo-router";
import { ReactNode, useMemo, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Appbar, Drawer, Surface, useTheme } from "react-native-paper";

type AppDrawerLayoutProps = {
  children: ReactNode;
};


export default function AppDrawerLayout({ children }: AppDrawerLayoutProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const theme = useTheme();

  const title = useMemo(() => {
    if (pathname === "/settings") {
      return "Settings";
    }

    return "Home";
  }, [pathname]);

  const navigateTo = (route: "/" | "/settings") => {
    router.push(route);
    setDrawerOpen(false);
  };

  return (
    <View style={styles.root}>
      <Appbar.Header style={[styles.header, { backgroundColor: theme.colors.surface }]}>
        <Appbar.Action
          icon="menu"
          iconColor={theme.colors.onSurface}
          accessibilityLabel="Open navigation menu"
          onPress={() => setDrawerOpen(true)}
        />
        <Appbar.Content title={title} titleStyle={[styles.headerTitle, { color: theme.colors.onSurface }]} />
      </Appbar.Header>

      <View style={styles.content}>{children}</View>

      {drawerOpen ? (
        <>
          <Pressable
            style={styles.backdrop}
            accessibilityLabel="Close navigation menu"
            onPress={() => setDrawerOpen(false)}
          />

          <Surface style={[styles.drawer, { backgroundColor: theme.colors.surface }]}>
            <View style={styles.drawerHeader}>
              <Appbar.Action
                icon="close"
                iconColor={theme.colors.onSurface}
                accessibilityLabel="Close navigation menu"
                onPress={() => setDrawerOpen(false)}
              />
            </View>

            <Drawer.Section title="Navigation">
              <Drawer.Item
                label="Home"
                icon="home-outline"
                active={pathname === "/"}
                onPress={() => navigateTo("/")}
              />
              <Drawer.Item
                label="Settings"
                icon="cog-outline"
                active={pathname === "/settings"}
                onPress={() => navigateTo("/settings")}
              />
            </Drawer.Section>
          </Surface>
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    elevation: 0,
  },
  headerTitle: {
    fontWeight: "600",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  drawer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: 280,
    elevation: 3,
    zIndex: 2,
  },
  drawerHeader: {
    alignItems: "flex-end",
    paddingTop: 8,
    paddingHorizontal: 8,
  },
});
