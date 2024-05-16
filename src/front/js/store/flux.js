const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
      craftmen: [],
      craftmenselected: [],
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      selectcraftmen: (currentCraftman) => {
        const store = getStore();
        console.log("seleccionado", currentCraftman);
        setStore({ craftmenselected: currentCraftman });
        console.log(store.craftmenselected);
      },

      getMessage: async () => {
        try {
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },
      changeColor: (index, color) => {
        const store = getStore();

        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        setStore({ demo: demo });
      },

      loadSomeData: () => {
        const store = getStore();
        fetch(
          "https://literate-memory-pjr4w5jpjq49f6r57-3001.app.github.dev/api/craftmen/"
        )
          .then((response) => response.json())
          .then((data) => {
            setStore({ craftmen: data });
            console.log(store.craftmen);
          })
          .catch((error) => console.error(error));
      },

      getcraftman: (id) => {
        const store = getStore();

        const requestOptions = {
          method: "GET",
          redirect: "follow",
        };

        fetch(
          `https://literate-memory-pjr4w5jpjq49f6r57-3001.app.github.dev/api/craftmen/${id}`,
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => {
            console.log("se hace un get by id de: ", result);
            setStore({ craftmenselected: result });
          })
          .catch((error) => console.error(error));
      },

      putedit: (craftmenselected) => {
        const store = getStore();

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append(
          "Cookie",
          ".Tunnels.Relay.WebForwarding.Cookies=CfDJ8E0FHi1JCVNKrny-ARCYWxOvCUAx3aWs4VeBfGMb_QhxvJh4QzBKWJh-ut0Fkg-EmN5NY6UbJ3L1PVChvhlUFXRCNohecFuPmFkL197LQSKNUvtNdN4TXyP2Gn2gGHrKcN-v-H9Cz9zfmgvyJ1sDNfclWRRhQStYj8nhq-TgipmSkt8QoffrOQfFJVCpjNSc1gYx6a_I3TIvnl8ynDSZJ02AZx5ee29nlclwVwG3A_i6YrohOQ1XxNWW5_ykgyx1D6SwQ3BZ-l-6KWX-eLyAFQ7XvWIptZHE18sRATx6gYMKrVfXzFr_gaFh2mwvC34iRTp_YF0PLS8D-F0lcL4Hx0Mc9ZVkaf_cI-amP-zAYob1-s5PrwctSL-Q2LLcY_f_oEgGj3AK3-ys13XVwS_hUJ44novvb-4QQdltKy2nqPnQjpxVwSOAhPtg68w6bAIpR9Roei9bUNlqh1wcan_V3andVDXoFljzetRhQtjmfPZ5Nffh0bavOKACq1uK9J9OaBkXHG4XXTGNISARJdZ5QxBxe4k-N-2B1TWY1LfZaJe1o1ST-rndqH3aLaab4_s1Iq84MJ9VtFFs5JZs_mfXVNUoyT7K_Si2rA8QyQ0AqAiCI4LaVFbawKi6V1YE68okbN-MVy68DPyfrjPVeeFt9PXmJw0lp8b4lVmOyZaHRyGLtVHdMUFCa1NQpZYflPSo4QG7pE6cYp-b4YUQVbLsG7ygpLIZS64WzoODRTwz-TNyWsEtdorVGN-DGTQJjJD0ozsFMwQm74FjfQRErv0ci7ne49ieStkEjtnEPeJeC9ieJsamwn4mqR2Y7i_xC4h6rXDEXHh7v-zyC5ACt8-6YcEmAYB4wD80wgJFJXvjj6tyOVP9ASuOonByNOdlPrTcGF-GuinZz2pWLbwikazxJTaFo0aulTxbk4EiPUCCGsD4CejeaNDTIeaukWetjeeTaKM_2gmsJR1XHxUjitB85IKIIEGKJa68a5bY68f9xq6L"
        );

        const raw = JSON.stringify({
          address: store.craftmenselected.address,
          city: store.craftmenselected.city,
          email: store.craftmenselected.email,
          id: store.craftmenselected.id,
          is_active: true,
          last_name: store.craftmenselected.last_name,
          name: store.craftmenselected.name,
          password: store.craftmenselected.password,
          phone: store.craftmenselected.phone,
          state: store.craftmenselected.state,
          zip_code: store.craftmenselected.zip_code,
        });

        const requestOptions = {
          method: "PUT",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch(
          `https://literate-memory-pjr4w5jpjq49f6r57-3001.app.github.dev/api/craftmen/${store.craftmenselected.id}`,
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => console.log(result))
          .catch((error) => console.error(error));
      },

      eliminar: () => {
        const store = getStore();

        const requestOptions = {
          method: "DELETE",
          redirect: "follow",
        };

        fetch(
          `https://literate-memory-pjr4w5jpjq49f6r57-3001.app.github.dev/api/craftmen/${store.craftmenselected.id}`,
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => {
            console.log(result);
            getActions().loadSomeData();
          })
          .catch((error) => console.error(error));
      },

      postContact: (data) => {
        const raw = JSON.stringify(data);

        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: raw,
          redirect: "follow",
        };

        fetch(
          "https://literate-memory-pjr4w5jpjq49f6r57-3001.app.github.dev/api/craftmen",
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => {
            console.log(result);
            getActions().loadSomeData();
          })
          .catch((error) => console.error(error));
      },
    },
  };
};

export default getState;
