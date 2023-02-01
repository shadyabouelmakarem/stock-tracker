<script lang="ts">
import { defineComponent } from "vue";
import Header from "./components/Header.vue";
import TextField from "./components/TextField.vue";
import Card from "./components/Card.vue";
import Button from "./components/Button.vue";
import "./index.css";

interface Stock {
  isin: string;
  price: number;
  bid: number;
  ask: number;
}

export default defineComponent({
  components: {
    Header,
    TextField,
    Card,
    Button,
  },
  data() {
    return {
      isin: "",
      validationError: "",
      subscribedStocks: {} as Stock,
      socket: null,
    };
  },
  created() {
    this.socket = new WebSocket("ws://localhost:8425");

    this.socket.onmessage = (event) => {
      const stock: Stock = JSON.parse(event.data);
      this.subscribedStocks[stock.isin] = stock;
    };
  },
  methods: {
    submitForm() {
      if (this.subscribedStocks.hasOwnProperty(this.isin)) {
        console.error("Can't subscribe to an ISIN twice...");
      } else {
        this.subscribedStocks[this.isin] = null;
        this.socket.send(JSON.stringify({ subscribe: this.isin }));
      }
    },
    validateISIN(value: string) {
      const isin = value.trim();
      this.validationError = "";

      if (!isin) {
        this.validationError = "ISIN is required";
        return;
      }

      if (isin.length !== 12) {
        this.validationError = "ISIN must be 12 characters";
        return;
      }

      if (!/^[A-Z]{2}[0-9A-Z]{9}[0-9]{1}$/.test(isin)) {
        this.validationError = "Invalid ISIN format";
        return;
      }

      this.isin = isin;
      this.validationError = "";
    },
    unsubscribe(isin: string) {
      this.socket.send(JSON.stringify({ unsubscribe: isin }));
      delete this.subscribedStocks[isin];
    },
  },
});
</script>

<template>
  <Header />
  <main class="main">
    <div class="form-container">
      <form @submit.prevent="isin && submitForm()">
        <div class="form-field">
          <TextField
            placeholder="Enter ISIN"
            class="isin-field"
            :value="isin"
            @input="validateISIN($event.target.value)"
          />
          <p v-if="validationError" class="validation-error">
            {{ validationError }}
          </p>
        </div>
        <Button class="subscribe-button">Subscribe</Button>
      </form>
    </div>
    <Card v-if="Object.keys(subscribedStocks).length" class="stocks-card">
      <table class="data-table">
        <thead>
          <tr class="header-row">
            <th class="header-cell">ISIN</th>
            <th class="header-cell">Price</th>
            <th class="header-cell">Bid</th>
            <th class="header-cell">Ask</th>
            <th class="header-cell"></th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(stock, isin) in subscribedStocks">
            <tr class="data-row">
              <td class="data-cell isin-cell">{{ isin }}</td>
              <td class="data-cell price-cell">{{ stock?.price }}</td>
              <td class="data-cell bid-cell">{{ stock?.bid }}</td>
              <td class="data-cell ask-cell">{{ stock?.ask }}</td>
              <td class="data-cell unsubscribe-cell">
                <button class="unsubscribe-button" @click="unsubscribe(isin)">
                  Unsubscribe
                </button>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </Card>
  </main>
</template>

<style lang="scss">
#app {
  font-family: var(--font-regular);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.main {
  max-width: var(--max-width);
  margin: 0 auto;
}
.form-field {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  .validation-error {
    color: red;
    font-size: 12px;
    margin-top: 5px;
  }
}

.subscribe-button {
  cursor: pointer;
  margin-top: 10px;
}

.stocks-card {
  margin-top: 20px;

  .data-table {
    color: white;
    border-collapse: collapse;
    width: 100%;

    thead {
      .header-row {
        border-bottom: 1px solid white;

        .header-cell {
          padding: 10px;
          text-align: center;
        }
      }
    }

    tbody {
      .data-row {
        border-top: 1px solid white;

        .data-cell {
          padding: 10px;
          width: 20%;
          text-align: center;

          &.isin-cell {
            color: blue;
          }

          &.price-cell {
            color: green;
          }

          &.bid-cell {
            color: yellow;
          }

          &.ask-cell {
            color: red;
          }
        }

        .unsubscribe-cell {
          text-align: center;

          .unsubscribe-button {
            background-color: red;
            color: white;
            border: none;
            border-radius: 5px;
            padding: 10px 20px;
            font-size: 16px;
            cursor: pointer;
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
