<script lang="ts">
import { defineComponent } from "vue";
import Header from "./components/Header.vue";
import TextField from "./components/TextField.vue";
import Card from "./components/Card.vue";
import Button from "./components/Button.vue";
import ToastCenter from "./components/ToastCenter.vue";
import "./index.css";

// Define the structure of the Stock object
interface Stock {
  isin: string;
  price: number;
  bid: number;
  ask: number;
}

export default defineComponent({
  // Declare the components used in this component
  components: {
    Header,
    TextField,
    Card,
    Button,
    ToastCenter,
  },
  data() {
    return {
      isin: "", // the ISIN to be validated and subscribed to
      validationError: "", // an error message if the ISIN validation fails
      subscribedStocks: {} as Stock, // a list of stocks that are subscribed to
      socket: null, // a WebSocket connection
    };
  },
  created() {
    // Establish a WebSocket connection to the server
    this.socket = new WebSocket("ws://localhost:8425");

    // Show a warning toast if the connection is closed
    this.socket.onclose = (event: any) => {
      console.warn("WebSocket connection closed with code: ", event.code);
      this.$refs.toastCenter.addToast(
        "Connection interrupted, the current data is not up to date.",
        "warn"
      );
    };

    // Show a success toast when the connection is re-established
    this.socket.onopen = () => {
      if (Object.keys(this.subscribedStocks).length) {
        console.log("WebSocket connection established");
        this.$refs.toastCenter.addToast(
          "Connection restablished, the data you are viewing is up to date.",
          "success"
        );
      }
    };

    // Update the subscribed stocks list with new data from the server
    this.socket.onmessage = (event) => {
      const stock: Stock = JSON.parse(event.data);
      this.subscribedStocks[stock.isin] = stock;
    };
  },
  methods: {
    // Subscribing to a stock by sending the "ISIN" to the server subscription channel
    submitForm() {
      if (this.subscribedStocks.hasOwnProperty(this.isin)) {
        this.$refs.toastCenter.addToast(
          "Can't subscribe to an ISIN twice...",
          "error"
        );
      } else {
        this.subscribedStocks[this.isin] = null;
        this.socket.send(JSON.stringify({ subscribe: this.isin }));
      }
    },
    // Validate the ISIN on input
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
    <Card class="stocks-card">
      <table v-if="Object.keys(subscribedStocks).length" class="data-table">
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
      <p v-else class="no-subscriptions-note">
        You are currently not subscribed to any Stock.
      </p>
    </Card>
  </main>
  <ToastCenter ref="toastCenter" />
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

  .form-field {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;

    .validation-error {
      color: red;
      font-size: 80%;
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

    .no-subscriptions-note {
      text-align: center;
      padding: 30px;
    }
  }
}

@media only screen and (max-width: 600px) {
  .main {
    font-size: 20px !important;

    .form-container {
      display: flex;
      justify-content: center;

      form {
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
    }

    .stocks-card {
      margin-top: 35px;

      table {
        display: block;
        overflow-x: auto;
      }
    }
  }
}
</style>
