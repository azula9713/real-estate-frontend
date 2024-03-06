import { Tabs } from "flowbite-react";

type Props = {
  title: string;
  indexOfTab: number;
  activeTab: number;
  setActiveTab: (tabIndex: number) => void;
  children?: React.ReactNode;
};

function ConnectionTab({
  title,
  indexOfTab: tabIndex,
  activeTab,
  setActiveTab,
  children,
}: Readonly<Props>) {
  return (
    <Tabs.Item
      active={activeTab === tabIndex}
      onClick={() => setActiveTab(tabIndex)}
      title={title}
    >
      <div>{children}</div>
    </Tabs.Item>
  );
}

export default ConnectionTab;
