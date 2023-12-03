import { BarList, Bold, Card, Flex, Text, Title } from "@tremor/react";

const data = [
  {
    name: "Oreo",
    value: 200,
    href: "https://twitter.com/tremorlabs",
    icon: function Oreo() {
      return (
        <img src="galleta.png" alt="oreo" className="w-5 mr-2" />
      );
    },
  },
  {
    name: "Plana",
    value: 351,
    href: "https://google.com",
    icon: function Plana() {
      return (
        <img src="galleta(1).png" alt="plana" className="w-5 mr-2" />
      );
    },
  },
  {
    name: "Relleno de fresa",
    value: 271,
    href: "https://github.com/tremorlabs/tremor",
    icon: function Relleno_fresa() {
      return (
        <img src="galleta(2).png" alt="Relleno de fresa" className="w-5 mr-2" />
      );
    },
  },
  {
    name: "Naranja",
    value: 191,
    href: "https://reddit.com",
    icon: function Naranja() {
      return (
        <img src="/galleta(3).png" alt="Naranja" className="w-5 mr-2" />
      );
    },
  },
  {
    name: "Relleno de vainilla",
    value: 91,
    href: "https://www.youtube.com/@tremorlabs3079",
    icon: function Relleno_vainilla() {
      return (
        <img src="/galleta(4).png" alt="Relleno de vainilla" className="w-5 mr-2" />
      );
    },
  },
  {
    name: "Relleno de naranja",
    value: 91,
    href: "https://www.youtube.com/@tremorlabs3079",
    icon: function Relleno_naranja() {
      return (
        <img src="/galleta(5).png" alt="Relleno de naranja" className="w-5 mr-2" />
      );
    },
  },
  {
    name: "Decorada",
    value: 91,
    href: "https://www.youtube.com/@tremorlabs3079",
    icon: function Decorada() {
      return (
        <img src="/galletas.png" alt="Decorada" className="w-5 mr-2" />
      );
    },
  },
  {
    name: "De helado",
    value: 91,
    href: "https://www.youtube.com/@tremorlabs3079",
    icon: function De_oblea() {
      return (
        <img src="/helado.png" alt="De helado" className="w-5 mr-2" />
      );
    },
  },
  {
    name: "De oblea",
    value: 91,
    href: "https://www.youtube.com/@tremorlabs3079",
    icon: function De_helado() {
      return (
        <img src="/oblea.png" alt="De oblea" className="w-5 mr-2" />
      );
    },
  },
  {
    name: "De chispas",
    value: 91,
    href: "https://www.youtube.com/@tremorlabs3079",
    icon: function De_chispas() {
      return (
        <img src="/pepitas-de-chocolate.png" alt="De chispas" className="w-5 mr-2" />
      );
    },
  },
];

export default () => (
  <Card className="text-center">
    <Title>Analisis de ventas</Title>
    <Flex className="mt-4">
      <Text>
        <Bold>Galleta</Bold>
      </Text>
      <Text>
        <Bold>Ventas</Bold>
      </Text>
    </Flex>
    <BarList data={data} className="mt-2" />
  </Card>
);