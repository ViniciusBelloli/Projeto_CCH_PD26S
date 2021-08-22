import * as React from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import { TextInput, Button, HelperText, Switch } from 'react-native-paper';
import { useForm, Controller } from "react-hook-form";

const Cadastro = () => {
  const [visible, setVisible] = React.useState(true);
  const hideDialog = () => setVisible(false);

  const onSubmit = (values) => {
    const { age, name } = values //destructuring
    const student = ((isSwitchOn) ? "Sim" : "Não")
    alert("Usuário Cadastrado com Sucesso!\n" +
      "Nome: " + name +
      "\nIdade: " + age +
      "\nSexo: " + selectedGender +
      "\nEstudante: " + student +
      "\nSeu Limite: " + limiteBanco.toFixed(2))
  }

  const [selectedGender, setSelectedGender] = React.useState("Masculino");
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  const [limiteBanco, setLimiteBanco] = React.useState(250);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <View style={{ width: "85%", alignSelf: "center", paddingVertical: 10 }}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Nome"
              placeholder="Digite seu nome"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="name"
          defaultValue=""
        />
        {errors.name && (
          <HelperText type="error" visible={errors.name}>
            O Nome e obrigatório!
          </HelperText>
        )}

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={{ marginTop: 10 }}
              label="Idade"
              keyboardType="numeric"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="age"
          defaultValue=""
        />
        {errors.age && (
          <HelperText type="error" visible={errors.age}>
            A idade e obrigatória!
          </HelperText>
        )}

        <View style={{ width: "85%", alignSelf: "baseline", paddingVertical: 10, flexDirection: "row" }}>
          <Text style={{ paddingTop: 18, marginRight: 10, fontWeight: "bold" }}>Sexo:</Text>
          <Picker
            style={{ width: "80%" }}
            selectedValue={selectedGender}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedGender(itemValue)
            }>
            <Picker.Item label="Masculino" value="Masculino" />
            <Picker.Item label="Feminino" value="Feminino" />
          </Picker>
        </View>

        <View style={{ width: "85%", alignSelf: "baseline", paddingVertical: 5, flexDirection: "row" }}>
          <Text style={{ paddingTop: 5, marginRight: 10, fontWeight: "bold" }}>Estudante:</Text>
          <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
        </View>

        <View style={{ width: "85%", alignSelf: "baseline", paddingVertical: 10, flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold", marginRight: 10 }}>Seu Limite:</Text>
          <Text style={{ color: "red" }}>{"R$ " + limiteBanco.toFixed(2)}</Text>
        </View>

        <Slider
          style={{ width: "85%", height: 40, alignSelf: "baseline" }}
          minimumValue={250.00}
          maximumValue={10000.00}
          minimumTrackTintColor="orange"
          maximumTrackTintColor="#000000"
          onValueChange={valor => { setLimiteBanco(valor) }}
        />

        <Button style={{ marginTop: 10 }} mode="contained" onPress={handleSubmit(onSubmit)}>
          Cadastrar-se
        </Button>
      </View>
    </View >
  );
};

export default Cadastro;