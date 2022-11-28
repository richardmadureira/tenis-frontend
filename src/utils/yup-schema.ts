import { date, number, object, string } from 'yup';

export const novoTorneioSchema = object().shape({
  nome: string().required("É necessário informar o nome do torneio."),
  horarioPrevisto:
    date()
      .required("É necessário informar o horário previsto do torneio.")
});

export const novoTenistaSchema = object().shape({
  nome: string().required("É necessário informar o nome do tenista."),
  email: string().required("É necessário informar o nome do tenista."),
  codigoSexo: number().transform((value) => value ? parseInt(value) : value).required("É necessário informar o sexo").oneOf([1, 2], 'Sexo informado não é válido'),
  dataNascimento:
    date()
      .required("É necessário informar a data de nascimento do tenista.")
});

export const novaTemporadaSchema = object().shape({
  descricao: string().required('É necessário informar uma descrição para a temporada.'),
  horarioInicio: date().required('É necessário informar a data de início da temporada').typeError('É necessário informar uma data de início válida'),
  horarioTermino: date().required('É necessário informar a data de término da temporada').typeError('É necessário informar uma data de término válida'),
});

export const novoDesafioSchema = object().shape({
  codigoTipoPartida: number().required('É necessário informar o tipo de partida').oneOf([1,2,3,4,5], 'Tipo de partida inválido'),
  horarioPrevisto: date().required('É necessário informar o horário previsto do desafio'),
  tenistaDesafiante1: number().required('É necessário informar o tenista desafiante 1'),
  tenistaDesafiado1: number().required('É necessário informar o tenista desafiado 1'),
  tenistaDesafiante2: number().when('codigoTipoPartida',{
    is: (codigoTipoPartida: number) => codigoTipoPartida && codigoTipoPartida > 2,
    then: number().required('É necessário informar o tenista desafiante 2'),
    otherwise: number().nullable().optional()
  }),
  tenistaDesafiado2: number().when('codigoTipoPartida',{
    is: (codigoTipoPartida: number) => codigoTipoPartida && codigoTipoPartida > 2,
    then: number().required('É necessário informar o tenista desafiado 2'),
    otherwise: number().nullable().optional()
  })
});