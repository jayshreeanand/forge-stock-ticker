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

const ALPHA_VANTAGE_API_BASE_URL = "https://www.alphavantage.co";

const defaultConfig = {
  searchTerm: "IBM",
};

interface AlphaVantageJson {
  stockValue: "0.00";
}

const fallbackDataArray = [
  {
    "Global Quote": {},
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
  // const { 'Global Quote':  } = dataArray;

  // return {
  //   alt_description,
  // };
  return stockValue;
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
  const [{ stockValue }, setRandomImage] = useAction(
    async () => await getRandomImage(config.searchTerm),
    async () => await getRandomImage(config.searchTerm)
  );

  // var stockValue = result["05. price"];

  return (
    <Fragment>
      <StockCard symbol={config.searchTerm} value={stockValue} />
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
