import ForgeUI, {
  render,
  Text,
  ConfigForm,
  Fragment,
  Image,
  useAction,
  Button,
  useState,
  useProductContext,
  useConfig,
  IssuePanel,
  TextField,
  Macro,
  Select,
  Option,
} from "@forge/ui";
import api from "@forge/api";
import { generateDataURI } from "./util";

const ALPHA_VANTAGE_API_BASE_URL = "https://www.alphavantage.co";

const defaultConfig = {
  searchTerm: "IBM",
};

interface AlphaVantageJson {
  stockValue: "0.00";
  percentageChange: "0";
}

const fallbackDataArray = [
  {
    "Global Quote": {
      "05. price": "0.00",
      "10. change percent": "0",
    },
  },
];

const getRandomImage = async (symbol): Promise<AlphaVantageJson> => {
  console.log("Making AlphaVantage API call...");
  console.log("env variabe");
  console.log(process.env.ALPHA_VANTAGE_ACCESS_KEY);
  const uri = `${ALPHA_VANTAGE_API_BASE_URL}/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.ALPHA_VANTAGE_ACCESS_KEY}`;
  const response = await api.fetch(encodeURI(uri));

  const body = await response.json();
  console.log(body);
  var dataArray = body;
  if (dataArray == undefined || dataArray["Global Quote"] == {}) {
    dataArray = fallbackDataArray;
  }
  const stockValue = dataArray["Global Quote"]["05. price"];
  const percentageChange = dataArray["Global Quote"]["10. change percent"];
  console.log("stock value");
  console.log(stockValue);
  console.log({ percentageChange });
  return { stockValue, percentageChange };
};

interface StockCardProps {
  symbol: string;
  value: string;
}

const StockCard = ({ symbol, value }: StockCardProps) => (
  <Fragment>
    <Text>{symbol}</Text>
    <Text>{value}</Text>
  </Fragment>
);

const App = () => {
  const config = useConfig();
  const context = useProductContext();
  const [{ stockValue, percentageChange }, setRandomImage] = useAction(
    async () => await getRandomImage(config.searchTerm),
    async () => await getRandomImage(config.searchTerm)
  );
  var dataURI = generateDataURI(
    config.searchTerm,
    stockValue,
    percentageChange
  );
  var output = `${stockValue} -- ${percentageChange}`;

  return (
    <Fragment>
      <Image src={dataURI} alt={output} />
    </Fragment>
  );
};

const Config = () => {
  return (
    <ConfigForm>
      <TextField
        label="Stock Symbol"
        name="searchTerm"
        defaultValue="IBM"
      ></TextField>
    </ConfigForm>
  );
};

export const run = render(
  <IssuePanel>
    <Macro app={<App />} config={<Config />} defaultConfig={defaultConfig} />
  </IssuePanel>
);
