import React, { useRef, useEffect, useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, findNodeHandle, StyleSheet, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function Index() {
  const scrollViewRef = useRef<ScrollView>(null);
  const [layoutReady, setLayoutReady] = useState(false);

  const sectionRefs = {
    uses: useRef<View>(null),
    images: useRef<View>(null),
    dosage: useRef<View>(null),
    results: useRef<View>(null),
    interactions: useRef<View>(null),
    sideEffects: useRef<View>(null),
    warnings: useRef<View>(null),
  };

  const { section } = useLocalSearchParams();
  const router = useRouter();

  const scrollToSection = useCallback((key: keyof typeof sectionRefs) => {
    const node = sectionRefs[key].current;
    if (node && scrollViewRef.current) {
      node.measureLayout(
        findNodeHandle(scrollViewRef.current),
        (x, y) => scrollViewRef.current?.scrollTo({ y, animated: true }),
        (err) => console.warn('Scroll error:', err)
      );
    }

    if (layoutReady) {
      router.setParams({ section: key });
    }
  }, [layoutReady]);

  useEffect(() => {
    if (layoutReady && section && sectionRefs[section as keyof typeof sectionRefs]) {
      scrollToSection(section as keyof typeof sectionRefs);
    }
  }, [layoutReady, section]);

  return (
    <View style={styles.container} onLayout={() => setLayoutReady(true)}>
      <ScrollView ref={scrollViewRef} style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.productTitle}>Finasteride</Text>
          <Text style={styles.subtitle}>A treatment for hair loss and enlarged prostate</Text>
        </View>

        <View ref={sectionRefs.uses} style={styles.section}>
          <Text style={styles.title}>Uses</Text>
          <View style={styles.sectionContent}>
            <Text style={styles.paragraph}>
              Finasteride is primarily used to treat:
              {"\n"}• Male pattern hair loss (androgenetic alopecia)
              {"\n"}• Benign prostatic hyperplasia (BPH) – an enlarged prostate
            </Text>
          </View>
        </View>

        <View ref={sectionRefs.images} style={styles.section}>
          <Text style={styles.title}>Images</Text>
          <View style={styles.sectionContent}>
            <Image
              source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Finasteride_structure.svg/1920px-Finasteride_structure.svg.png' }}
              style={{ width: '100%', height: 180, borderRadius: 8 }}
              resizeMode="contain"
            />
            <Text style={styles.imageCaption}>Chemical structure of Finasteride</Text>
          </View>
        </View>

        <View ref={sectionRefs.dosage} style={styles.section}>
          <Text style={styles.title}>Dosage</Text>
          <View style={styles.sectionContent}>
            <Text style={styles.paragraph}>
              • Hair loss: 1 mg once daily
              {"\n"}• BPH: 5 mg once daily
              {"\n"}• Take with or without food, around the same time each day
            </Text>
          </View>
        </View>

        <View ref={sectionRefs.results} style={styles.section}>
          <Text style={styles.title}>Results</Text>
          <View style={styles.sectionContent}>
            <Text style={styles.paragraph}>
              Results typically appear after 3 to 6 months of consistent use.
              {"\n"}• Hair regrowth is gradual and may stabilize hair loss.
              {"\n"}• Prostate symptoms (BPH) often improve after several weeks.
            </Text>
          </View>
        </View>

        <View ref={sectionRefs.interactions} style={styles.section}>
          <Text style={styles.title}>Interactions</Text>
          <View style={styles.sectionContent}>
            <Text style={styles.paragraph}>
              Finasteride has minimal drug interactions but may interact with:
              {"\n"}• Dutasteride (similar mechanism)
              {"\n"}• St. John’s Wort (may reduce effectiveness)
              {"\n"}• Inform your doctor about all medications and supplements
            </Text>
          </View>
        </View>

        <View ref={sectionRefs.sideEffects} style={styles.section}>
          <Text style={styles.title}>Side Effects</Text>
          <View style={styles.sectionContent}>
            <Text style={styles.paragraph}>
              Common:
              {"\n"}• Decreased libido
              {"\n"}• Erectile dysfunction
              {"\n"}• Ejaculation disorders
              {"\n\n"}Rare:
              {"\n"}• Breast tenderness or enlargement
              {"\n"}• Depression
              {"\n"}• Allergic reactions
            </Text>
          </View>
        </View>

        <View ref={sectionRefs.warnings} style={styles.section}>
          <Text style={styles.title}>Warnings</Text>
          <View style={styles.sectionContent}>
            <Text style={styles.paragraph}>
              • Not for use in women or children
              {"\n"}• Women who are pregnant or may become pregnant should avoid handling crushed tablets (risk of birth defects)
              {"\n"}• Long-term use may affect PSA test results for prostate cancer
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.menu}>
  <View style={styles.infoSection}>
    <Text style={styles.stockStatus}>In Stock</Text>

    <Text style={styles.shippingText}>
      Free Delivery Friday June 25, 2025 to
      <Text style={{ fontWeight: 'bold' }}> 123 Main St, Springfield.</Text>
      {'\n'}Order within 9hrs and 51mins
    </Text>

    <View style={styles.priceLayout}>
      <Text style={styles.dollarSign}>$</Text>
      <Text style={styles.dollarFigure}>134</Text>
      <Text style={styles.centFigure}>99</Text>
      <View style={styles.occurenceLayout}>
        <Text style={styles.perMonth}>/ Month</Text>
      </View>
    </View>
  </View>

  <View style={styles.buyContainer}>
    <TouchableOpacity style={styles.buyBtn}>
      <Text style={styles.buyBtnText}>Subscribe Now</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.addToCartBtn}>
      <Text style={styles.addBtnText}>Add To Cart</Text>
    </TouchableOpacity>
  </View>

  <Text style={styles.menuHeader}>Explore</Text>
  <ScrollView style={styles.sectionScroll} showsVerticalScrollIndicator={false}>
    {Object.keys(sectionRefs).map((key) => (
      <TouchableOpacity
        key={key}
        style={styles.menuBtn}
        onPress={() => scrollToSection(key as keyof typeof sectionRefs)}
      >
        <Text style={styles.menuText}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
      </TouchableOpacity>
    ))}
  </ScrollView>
</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingTop: 55,

  },
  content: {
    width: '80%',
    padding: 24,
  },
  header: {
    marginBottom: 20,
  },
  productTitle: {
    fontSize: 28,
    fontWeight: '600',
    color: '#111',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginTop: 6,
  },
  section: {
    marginBottom: 48,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
  },
  sectionContent: {
    paddingLeft: 4,
  },
  paragraph: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  imageCaption: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
  menu: {
    width: '20%',
    minWidth: 200,
    maxWidth: 280,
    padding: 16,
    backgroundColor: '#fafafa',
    borderLeftWidth: 1,
    borderColor: '#eee',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'relative',
  },
  
  infoSection: {
    marginBottom: 16,
  },
  
  stockStatus: {
    color: '#388e3c',
    fontWeight: '600',
    fontSize: 14,
  },
  
  shippingText: {
    marginTop: 6,
    fontSize: 13,
    color: '#555',
    lineHeight: 18,
  },
  
  priceLayout: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 10,
  },
  
  dollarSign: {
    fontSize: 14,
    color: '#333',
    marginTop: 6,
  },
  
  dollarFigure: {
    fontSize: 30,
    fontWeight: '700',
    color: '#333',
    marginLeft: 2,
  },
  
  centFigure: {
    fontSize: 14,
    color: '#333',
    marginLeft: 2,
    marginTop: 6,
  },
  
  occurenceLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 4,
    marginTop: 16,
  },
  
  perMonth: {
    fontSize: 14,
    color: '#777',
  },
  
  buyContainer: {
    gap: 10,
    marginBottom: 20,
  },
  
  buyBtn: {
    backgroundColor: '#000',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  
  buyBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  
  addToCartBtn: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  
  addBtnText: {
    color: '#222',
    fontSize: 16,
    fontWeight: '600',
  },
  
  menuHeader: {
    fontSize: 14,
    fontWeight: '600',
    color: '#888',
    marginBottom: 8,
    marginTop: 12,
  },
  
  sectionScroll: {
    maxHeight: 300,
  },
  
  menuBtn: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: '#f0f0f0',
    marginBottom: 8,
  },
  
  menuText: {
    fontSize: 15,
    color: '#111',
  },
});