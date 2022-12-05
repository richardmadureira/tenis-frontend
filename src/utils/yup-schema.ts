import { boolean, date, number, object, string } from 'yup';

export const novoTorneioSchema = object().shape({
  nome: string().required("É necessário informar o nome do torneio."),
  horarioPrevisto:
    date()
      .required("É necessário informar o horário previsto do torneio.")
});

export const novoTenistaSchema = object().shape({
  nome: string().required("É necessário informar o nome do tenista."),
  email: string().required("É necessário informar o nome do tenista."),
  codigoSexo: number().transform((v) => v ? parseInt(v) : v).required("É necessário informar o sexo").oneOf([1, 2], 'Sexo informado não é válido'),
  dataNascimento:
    date()
      .required("É necessário informar a data de nascimento do tenista.")
});

export const novaTemporadaSchema = object().shape({
  descricao: string().required('É necessário informar uma descrição para a temporada.'),
  horarioInicio: date().required('É necessário informar a data de início da temporada').typeError('É necessário informar uma data de início válida'),
  horarioTermino: date().required('É necessário informar a data de término da temporada').typeError('É necessário informar uma data de término válida'),
  ativa: boolean().required('É necessário informar se a temporada estará ativa ou não'),
  ano: number().transform(v => v ? parseInt(v) : v).required('É necessário informar o ano')
});

export const novoDesafioSchema = object().shape({
  codigoTipoPartida: number().nullable().required('É necessário informar o tipo de partida').oneOf([1,2,3,4,5], 'Tipo de partida inválido'),
  horarioPrevisto: date().nullable().required('É necessário informar o horário previsto do desafio'),
  idTemporada: string().nullable().required('É necessário informar a temporada'),
  idTenistaDesafiante1: string().nullable().required('É necessário informar o tenista desafiante 1'),
  idTenistaDesafiado1: string().nullable().required('É necessário informar o tenista desafiado 1'),
  idTenistaDesafiante2: string().nullable().when('codigoTipoPartida',{
    is: (codigoTipoPartida: number) => codigoTipoPartida && codigoTipoPartida > 2,
    then: string().nullable().required('É necessário informar o tenista desafiante 2'),
    otherwise: string().nullable().optional()
  }),
  idTenistaDesafiado2: string().nullable().when('codigoTipoPartida',{
    is: (codigoTipoPartida: number) => codigoTipoPartida && codigoTipoPartida > 2,
    then: string().nullable().required('É necessário informar o tenista desafiado 2'),
    otherwise: string().nullable().optional()
  })
});