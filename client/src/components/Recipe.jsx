import React, { useState, useEffect } from "react";
import axios from "axios";

// External components and hooks
import {
  Tabs, TabList, TabPanels, Tab, TabPanel,
  HStack, Container, Box, Divider, Flex, Spacer,
  Image, Heading, Text, Button, IconButton,
  ListItem, List, OrderedList, UnorderedList,
  useColorModeValue
} from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

import { ArrowBackIcon } from "@chakra-ui/icons";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useParams, Link } from "react-router-dom";

// import recipeInfo from "./recipe-data.js";

export default function Recipe() {
  const [originalServings, setOriginalServings] = useState(0);
  const [state, setState] = useState({
    ingredients: [],
    instructions: [],
    nutrition: [],
    title: "",
    readyInMinutes: "",
    image: "",
    servings: 0
  });

  // UPDATE STATE WITH API DATA
  const { id } = useParams();
  useEffect(() => {
    axios.get(`http://localhost:8080/api/recipes/${id}`
    ).then((res) => {
      // console.log("res", res.data);
      setState(prev => ({ ...prev, ...res.data }));
      setOriginalServings(res.data.servings);
    });
  }, [id]);

  // When using testing data:
  // useEffect(() => {
  //   setState(prev => ({ ...prev, ...recipeInfo }));
  //   setOriginalServings(recipeInfo.servings);
  // }, []);

  //SERVING CALCULATOR
  const addServing = () => {
    setState({
      ...state,
      servings: state.servings + 1
    });
  };

  const minusServing = () => {
    if (state.servings > 1) {
      setState({
        ...state,
        servings: state.servings - 1
      });
    }
  };

  //ARRAY OF INGREDIENTS
  const ingredientsArray = [...state.ingredients];

  //maps over ingredientsArray to return list of ingredients
  const ingredientList = ingredientsArray.map((ingredient, index) => {

    let newServings = state.servings / originalServings;

    const ingredientAmount = Number.isInteger(ingredient.amount * newServings) ?
      (ingredient.amount * newServings)
      : (ingredient.amount * newServings).toFixed(1);

    return (
      <ListItem key={index} py={2} borderBottom="1px" borderColor="gray.200">
        {`${ingredientAmount} ${ingredient.unit} ${ingredient.name}`}
      </ListItem>
    );
  });

  //creates an array of instructions
  const instructionsArray = [...state.instructions];

  //maps over instructionsArray to return a list of instructions
  const instructionsList = instructionsArray.map((instruction, index) => {
    return (
      <ListItem key={index} py={2} borderBottom="1px" borderColor="gray.200">
        <HStack spacing={5}>
          <Text fontWeight="500">{instruction.number}</Text>
          <Text>{instruction.step}</Text>
        </HStack>
      </ListItem>
    );
  });

  //creates an array of nutrition
  const nutritionArray = [...state.nutrition];
  // console.log("nutritionArray", nutritionArray);

  //maps over instructionsArray to return a list of instructions
  const nutritionList = nutritionArray.map((nutrient, index) => {
    return (
      <ListItem key={index} py={2} borderBottom="1px" borderColor="gray.200">
        <HStack justifyContent="space-between">
          <Text fontWeight="semibold">
            {nutrient.name}
          </Text>
          <Text>
            {nutrient.amount} {nutrient.unit}
          </Text>
        </HStack>
      </ListItem>
    );
  });




  return (
    <Box>
      <Link to={"/mealplan/2022-05-23"} >
        <Button
          m={5}
          bg={useColorModeValue("turquoiseGreen.100", "majestyPurple.500")}
          leftIcon={<ArrowBackIcon />}
          _hover={{ bg: useColorModeValue("turquoiseGreen.300", "majestyPurple.600") }}
          _active={{ bg: useColorModeValue("turquoiseGreen.500", "majestyPurple.700") }}
          aria-label="go back to meal plan"
        >
          Back
        </Button>
      </Link>
      <HStack alignItems="start" m={2}>
        <Container w="40%">
          <Heading as="h2" size="lg">{state.title}</Heading>
          <Divider />
          <Text py={2}>Cooking time: {state.readyInMinutes} minutes</Text>
          <HStack marginBottom={3}>

            <IconButton
              onClick={minusServing}
              borderRadius="50%"
              size="xs"
              colorScheme={useColorModeValue("turquoiseGreen", "majestyPurple")}
              icon={<FaMinus />}
              aria-label="minus serving by one"
            />
            <Text py={2}>{state.servings} servings</Text>
            <IconButton
              onClick={addServing}
              borderRadius="50%"
              size="xs"
              colorScheme={useColorModeValue("turquoiseGreen", "majestyPurple")}
              icon={<FaPlus />}
              aria-label="add serving by one"
            />
          </HStack>
          <Image src={state.image} rounded="md" />
        </Container>

        <Divider orientation="vertical" />


        <Tabs isFitted variant="enclosed" w="60%" h="75vh" overflow="auto" bg={useColorModeValue("white", "gray.700")} rounded="lg" boxShadow="lg">
          <TabList mb="1em" >
            <Tab
              border="1px"
              borderColor={useColorModeValue("gray.200", "gray.700")}
              bg={useColorModeValue(mode("hsl(0 0% 93%)", "gray.800"), "gray.900")}
              _selected={{ bg: useColorModeValue("turquoiseGreen.100", "majestyPurple.500") }}
              _hover={{ bg: useColorModeValue("turquoiseGreen.300", "majestyPurple.600") }}
              _active={{ bg: useColorModeValue("turquoiseGreen.500", "majestyPurple.700") }}
              aria-label="recipe ingredients tab"
            >Ingredients</Tab>
            <Tab
              border="1px"
              borderColor={useColorModeValue("gray.200", "gray.700")}
              bg={useColorModeValue(mode("hsl(0 0% 93%)", "gray.800"), "gray.900")}
              _selected={{ bg: useColorModeValue("turquoiseGreen.100", "majestyPurple.500") }}
              _hover={{ bg: useColorModeValue("turquoiseGreen.300", "majestyPurple.600") }}
              _active={{ bg: useColorModeValue("turquoiseGreen.500", "majestyPurple.700") }}
              aria-label="recipe instructions tab"
            >Instructions</Tab>
            <Tab
              border="1px"
              borderColor={useColorModeValue("gray.200", "gray.700")}
              bg={useColorModeValue(mode("hsl(0 0% 93%)", "gray.800"), "gray.900")}
              _selected={{ bg: useColorModeValue("turquoiseGreen.100", "majestyPurple.500") }}
              _hover={{ bg: useColorModeValue("turquoiseGreen.300", "majestyPurple.600") }}
              _active={{ bg: useColorModeValue("turquoiseGreen.500", "majestyPurple.700") }}
              aria-label="recipe nutrition tab"
            >Nutrition</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <UnorderedList>
                {ingredientList}
              </UnorderedList>
            </TabPanel>
            <TabPanel>
              <List>
                {instructionsList}
              </List>
            </TabPanel>
            <TabPanel>
              <List>
                {nutritionList}
              </List>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </HStack>
    </Box>


  );
}
