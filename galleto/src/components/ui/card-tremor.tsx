import {
    Card,
    Flex,
    Metric,
    ProgressBar,
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
    Text,
  } from "@tremor/react";
        
 
  
  export const CardTremor = () => {
    return (
      <Card>
        <Text>Total Sales</Text>
        <Metric>$ 442,276</Metric>
        <TabGroup>
          <TabList className="mt-8">
            <Tab >Día</Tab>
            <Tab >Semana</Tab>
            <Tab >Mes</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <div className="mt-10">
                <Flex className="mt-4">
                  <Text className="w-full">Galleta 1</Text>
                  <Flex className="space-x-2" justifyContent="end">
                    <Text>$ 108,799</Text>
                    <Text>38%</Text>
                  </Flex>
                </Flex>
                <ProgressBar value={38} className="mt-2" />
              </div>
            </TabPanel>
            <TabPanel>
              <div className="mt-10">
                <Flex className="mt-4">
                  <Text className="w-full">Galleta 2</Text>
                  <Flex className="space-x-2" justifyContent="end">
                    <Text>$ 99,484</Text>
                    <Text>16%</Text>
                  </Flex>
                </Flex>
                <ProgressBar value={12} className="mt-2" />
              </div>
            </TabPanel>
            <TabPanel>
              <div className="mt-10">
                <Flex className="mt-4">
                  <Text className="w-full">Galleta 3</Text>
                  <Flex className="space-x-2" justifyContent="end">
                    <Text>$ 102,00</Text>
                    <Text>30%</Text>
                  </Flex>
                </Flex>
                <ProgressBar value={30} className="mt-2" />
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </Card>
    );
  };