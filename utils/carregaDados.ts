import AsyncStorage from "@react-native-async-storage/async-storage"

export const carregarDadosStorage = async (chaves: string[]) => {
  const itensArmazenados = await AsyncStorage.multiGet(chaves)
  return itensArmazenados.map(([chave, valor]) => (
    valor ? JSON.parse(valor) : null
  ))
}