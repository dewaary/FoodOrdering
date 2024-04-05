import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import { defaultImage } from '@/src/components/ProductListItem'
import products from '@/assets/data/products'
import Button from '@/src/components/Button'

const sizes = ['S', 'M', 'L', 'XL']

const ProductDetailScreen = () => {
  const {id} = useLocalSearchParams()
  const [selectedSize, setSelectedSize] = useState('M')

  const product = products.find((p) => p.id.toString() === id)

  if(!product){
    return <Text>Product Not Found</Text>
  }

  const addToCart = () => {
    console.log('Test')
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{title: product.name}}/>

      <Image 
      source={{uri: product.image || defaultImage}}
      style={styles.image}
      />
      <Text>Selected Size</Text>
      <View style={styles.sizes}>
        {sizes.map((size) => (
          <Pressable onPress={() => {
            setSelectedSize(size)
          }} style={[styles.size, {backgroundColor: selectedSize === size ? "gainsboro" : "white"}]} key={size}>
            <Text style={[styles.sizeText, {color: selectedSize === size ? "black" : "gray"}]}>{size}</Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.price}>${product.price}</Text>
      <Button onPress={addToCart} text="Add To Cart"/>
    </View>
  )
}

export default ProductDetailScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    flex: 1,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    alignSelf: 'center',
  },
  subtitle: {
    marginVertical: 10,
    fontWeight: '600',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 'auto',
  },

  sizes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  size: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeText: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
  },
});