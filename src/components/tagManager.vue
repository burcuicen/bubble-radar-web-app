<template lang="pug">
.text-h6.q-mb-md Tag Manager
q-input(v-model="tagText" filled type="textarea" label="Tag Text" hint="Enter your tag text here")
q-btn(@click="generate" color="primary" label="Generate Model" class="q-mt-md")
.q-mt-md(v-if="tags.length")
  .text-h6.q-mb-md Tags
  .text-subtitle2.q-mb-md {{tags.length}} tags generated
  .row.q-col-gutter-md
    .col-12
      q-chip(v-for="tag in tags" :key="tag"  class="q-mr-md q-mb-md" color="secondary" text-color="white" :label="tag" removable @remove="removeTag(tag)" icon-remove="close")
    .col-12
      q-input(v-model="output" filled type="textarea" label="Output")
      q-btn(@click="copy(output)" color="primary" label="Copy" class="q-mt-md")
.q-mt-md(v-if="trademarkCheck.length")
  .text-h6.q-mb-md Check Trademark
  .row-q-col-gutter-md
    .col-12
      q-input(v-model="trademarkCheck" filled type="textarea" label="Output")
      q-btn(@click="copy(trademarkCheck)" color="primary" label="Copy" class="q-mt-md")

</template>
<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'TagManager',
  data() {
    return {
      tagText: '',
      tags: [],
      output: '',
      trademarkCheck: ''
    };
  },

  methods: {
    generate() {
      this.tags = [];
      const tagText = this.tagText;
      //if tags are separated by comma or new line then split them and add to tags array to show them on the screen
      if (this.tagText != '') {
        if (tagText.includes(',') || tagText.includes('\n')) {
          const newTags = tagText.split(/[\n,]/).filter((tag) => tag !== '');
          this.tags = this.tags.concat(newTags);
        } else {
          this.tags.push(tagText);
        }
      } else {
        console.log('Please enter a tag');
      }
      //remove duplicates
      //make all tags lowercase
      this.tags = this.tags.map((tag) => tag.trim().toLowerCase());
      this.tags = [...new Set(this.tags)];
      // loop in tags array to remove same tags
      for (let i = 0; i < this.tags.length; i++) {
        for (let j = i + 1; j < this.tags.length; j++) {
          //strip spaces and make all tags lowercase
          if (
            this.tags[i].trim().toLowerCase() ===
            this.tags[j].trim().toLowerCase()
          ) {
            this.tags.splice(j, 1);
          }
        }
      }

      this.generateOutput();
      this.generateTrademarkCheckOutput();
      this.tagText = '';
    },
    removeTag(tag) {
      this.tags = this.tags.filter((t) => t !== tag);
      this.generateOutput();
    },
    generateOutput() {
      //add comma and a space after each tag, if there is not a comma and a space at the end of the tag
      //strip spaces and make all tags lowercase
      this.output = this.tags
        .map((tag) => {
          if (tag.slice(-2) !== ',') {
            return tag.trim().toLowerCase() + ',';
          } else {
            return tag.trim().toLowerCase();
          }
        })
        .join('');

      const output = this.tags.join(',');
      this.output = output;
    },
    copy(text) {
      navigator.clipboard.writeText(text);
    },
    generateTrademarkCheckOutput() {
      //list all tags in a new line
      this.trademarkCheck = this.tags.join('\n');
    }
  },
});
</script>
