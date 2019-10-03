const allproducts = [
  {
    productName: 'Apfelringe',
    id: 0,
    category: 'Obst',
    price: 2.5,
    measure: 'g',
    unit: 100,
    img:
      'https://cdn.pixabay.com/photo/2018/01/23/05/13/apple-3100673_1280.jpg',
    infoShort:
      'Die Äpfel werden gewaschen und mit einem Apfelausstecher vom Kernhaus befreit. Je nach weiterer Verwendung oder persönlichem Geschmack werden sie geschält und dann in Ringe geschnitten.',
    infoLong:
      'Die so geschnittenen Äpfel können frisch verarbeitet werden, wobei das entsprechende Kochrezept die weitere Vorgehensweise angibt. Um die Verfärbung zu unterbinden, wird das Obst meist direkt nach dem Schneiden in Flüssigkeit gegeben (meist handelt es sich um mit Zusätzen wie Zitrone oder Essig versetztes Wasser). Die Rezepte zur Verarbeitung frischer Apfelringe reichen von süß – mit Zimt und Zucker, oder in flüssige Schokolade getunkt – bis sauer – mit grünem Paprika in Essig eingelegt. Die Ringe werden auch in verschiedenen Teigen gebacken oder frittiert. Für die Herstellung von getrockneten Apfelringen gibt es mehrere Methoden. Das Obst kann im Backofen (Umluft) bei geöffneter Tür, im Dörrapparat oder in der Mikrowelle getrocknet werden. Für die Länge des Trockenvorgangs ist die Dicke der Ringe maßgeblich. Die Apfelringe sollten trocken, aber noch weich und biegsam sein. Für die Aufbewahrung der ausgekühlten Apfelringe eignen sich z. B. Gläser mit Schraubverschluss, Dosen oder die Lagerung in dichten Leinenbeutel, oder als Kette auf eine Schnur gezogen in dunklen, trockenen Räumen, die keinen Temperaturschwankungen ausgesetzt sind. In allen Fällen ist eine regelmäßige Vorratskontrolle unerlässlich. Die so getrockneten Früchte können pur verzehrt werden, man kann sie aber auch in Wasser, Alkohol oder Fruchtsaft einlegen und weiterverarbeiten.',
    inCart: false,
    amount: false,
    rating: 4.9
  },

  {
    productName: 'Bio Eier',
    id: 1,
    category: 'Lebensmittel',
    price: 3.5,
    measure: 'Stück',
    unit: 6,
    img: 'https://cdn.pixabay.com/photo/2018/06/29/15/35/egg-3506222_1280.jpg',
    infoShort:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna ali',
    infoLong:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lore',
    inCart: false,
    amount: false,
    rating: 3.8
  },
  {
    productName: 'Schafskaese',
    id: 2,
    category: 'Lebensmittel',
    price: 8.5,
    measure: 'kg',
    unit: 0.5,
    img:
      'https://cdn.pixabay.com/photo/2016/05/03/14/00/bryndza-1369254_1280.jpg',
    infoShort:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna ali',
    infoLong: `Schafskäse oder Schafkäse ist Käse, hauptsächlich Weichkäse, aus Schafmilch. Schafskäse unterscheidet sich vor allem durch den stärkeren Geruch und Geschmack (vgl. Ziegenkäse) von Käse aus Kuhmilch. Zu den Schafskäsesorten gehören unter anderem Abertam, Beenleigh Blue, Brebis Pyrénées, Brinsen, Klenczer, Kaschkawal, Etorki, Schaf-Feta, Schaf-Halloumi, Lanark Blue, Kefalotiri, Idiazabal, Manchego, Oscypek, Pecorino, Roncal, Roquefort, Sirene (bulg. Сирене, Bulgarien, Schipkakäse, im Prinzip wie Feta), Torta del Casar und Valbreso. Schafskäse wird sehr oft, aber nicht notwendigerweise als Salzlakenkäse hergestellt. Während es sich bei ersterem um die Zuordnung nach der Milchart handelt (Schafsmilch, Kuhmilch, Ziegenmilch), aus der der Käse hergestellt wurde, geht es bei letzterem um die Herstellungsart (Salzlakenkäse, Schimmelkäse, Weichkäse, Schnittkäse).`,
    inCart: false,
    amount: false,
    rating: 4.8
  }
];

/*

export default allproducts;
*/

export function getProductById(id) {
  return allproducts.find(allproducts => allproducts.id === id);
}

export default function getAllProducts() {
  return allproducts;
}
