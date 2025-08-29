import { IIntervalo, IntervaloSelector } from "@/types/intervalos";
import { formatarData } from "@/utils/formataData";
import { dataValidation } from "@/utils/validacoes";
import { useState, useCallback } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { styles } from "./styles";

// --- Helpers ---
const formataDataBR = (data: Date) =>
  data.toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" });

const formataPeriodoTexto = (di: string, df: string) => {
  const toDate = (d: string) => {
    const [day, month, year] = d.split("-").map(Number);
    return new Date(year, month - 1, day);
  };
  const dataInicial = toDate(di);
  const dataFinal = toDate(df);

  if (dataInicial.getTime() === dataFinal.getTime()) return formataDataBR(dataInicial);
  return `${formataDataBR(dataInicial)} - ${formataDataBR(dataFinal)}`;
};

const ajustarData = (data: string, diff: { dias: number; meses: number; anos: number }, operacao: "somar" | "subtrair") => {
  const [dia, mes, ano] = data.split("-").map(Number);
  const novaData =
    operacao === "somar"
      ? new Date(ano + diff.anos, mes - 1 + diff.meses, dia + diff.dias)
      : new Date(ano - diff.anos, mes - 1 - diff.meses, dia - diff.dias);

  const [novoAno, novoMes, novoDia] = novaData.toISOString().split("T")[0].split("-").map(Number);
  return `${novoDia}-${novoMes}-${novoAno}`;
};

const IntervaloNavigator = ({
  intervalo,
  setIntervalo,
  diff,
  podeAumentar = true,
}: {
  intervalo: IIntervalo;
  setIntervalo: React.Dispatch<React.SetStateAction<IIntervalo>>;
  diff: { dias: number; meses: number; anos: number };
  podeAumentar?: boolean;
}) => {
  const hoje = new Date();

  const alterarIntervalo = (operacao: "somar" | "subtrair") => {
    const [di, mi, ai] = intervalo.dataInicial.split("-").map(Number);
    const [df, mf, af] = intervalo.dataFinal.split("-").map(Number);

    const novaDataInicial = ajustarData(intervalo.dataInicial, diff, operacao);
    const novaDataFinal =
      hoje.getTime() >= new Date(af + (operacao === "somar" ? diff.anos : -diff.anos), mf - 1 + (operacao === "somar" ? diff.meses : -diff.meses), df + (operacao === "somar" ? diff.dias : -diff.dias)).getTime()
        ? ajustarData(`${di}-${mi}-${ai}`, diff, operacao)
        : formatarData(hoje);

    setIntervalo({ ...intervalo, dataInicial: novaDataInicial, dataFinal: novaDataFinal });
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => alterarIntervalo("subtrair")}>
        <Text style={[styles.text, { padding: 5 }]}>{'<'}</Text>
      </Pressable>

      <Text style={styles.text}>{formataPeriodoTexto(intervalo.dataInicial, intervalo.dataFinal)}</Text>

      {podeAumentar ? (
        <Pressable onPress={() => alterarIntervalo("somar")}>
          <Text style={[styles.text, { padding: 5 }]}>{'>'}</Text>
        </Pressable>
      ) : (
        <Text style={{ paddingHorizontal: 12 }} />
      )}
    </View>
  );
};

// --- Componente principal ---
export const FiltroSelected = ({ intervalo, setIntervalo }: IntervaloSelector) => {
  const diferencaDeDias = intervalo.nome === "Semana" ? 7 : intervalo.nome === "Ano" ? 365 : 1;

  switch (intervalo.nome) {
    case "Período":
      return <FiltroPeriodo intervalo={intervalo} setIntervalo={setIntervalo} />;
    case "Mês":
      return (
        <IntervaloNavigator
          intervalo={intervalo}
          setIntervalo={setIntervalo}
          diff={{ dias: 0, meses: 1, anos: 0 }}
          podeAumentar={true}
        />
      );
    default:
      return (
        <IntervaloNavigator
          intervalo={intervalo}
          setIntervalo={setIntervalo}
          diff={{ dias: diferencaDeDias < 10 ? diferencaDeDias : 0, meses: diferencaDeDias >= 10 && diferencaDeDias < 40 ? 1 : 0, anos: diferencaDeDias >= 40 ? 1 : 0 }}
        />
      );
  }
};

// --- Componente FiltroPeriodo simplificado ---
const FiltroPeriodo = ({ intervalo, setIntervalo }: IntervaloSelector) => {
  const [intervaloInput, setIntervaloInput] = useState({ dataInicial: "00/00/0000", dataFinal: "00/00/0000" });

  const handleData = useCallback((e: string) => {
    let numeros = e.replace(/\D/g, "").substring(0, 8);
    let dia = numeros.substring(0, 2) || "";
    let mes = numeros.substring(2, 4) || "";
    let ano = numeros.substring(4, 8) || "";
    if (ano.length === 2) ano = "20" + ano;
    return { dia, mes, ano };
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
        {["dataInicial", "dataFinal"].map((campo) => (
          <TextInput
            key={campo}
            style={styles.text}
            value={intervaloInput[campo as keyof typeof intervaloInput]}
            onChange={(e) =>
              setIntervaloInput((prev) => ({ ...prev, [campo]: e.nativeEvent.text.replace(/\D/g, "").substring(0, 8) }))
            }
            onBlur={(e) => {
              const { dia, mes, ano } = handleData(intervaloInput[campo as keyof typeof intervaloInput]);
              dataValidation(dia, mes, ano);
              // setIntervalo({ ...intervalo, [campo]: [dia, mes, ano].filter(Boolean).join("/") });
              // setIntervaloInput((prev) => ({ ...prev, [campo]: [dia, mes, ano].filter(Boolean).join("/") }));
            }}
          />
        ))}
        <Text style={styles.text}>-</Text>
      </View>
    </View>
  );
};
