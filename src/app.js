document.addEventListener('alpine:init', () => {
    Alpine.data('produk', () => ({
        items: [
            {id: 1, name: 'Earlybird', img:'b_1.jpg', price: 35000 },
            {id: 2, name: 'Arabica Blend', img:'b_2.jpg', price: 55000 },
            {id: 3, name: 'Law Breakers', img:'b_4.jpg', price: 45000 },
            {id: 4, name: 'Aceh Gayo', img:'b_5.jpg', price: 50000 },
            {id: 5, name: 'Castillo Cuaca', img:'b_3.jpg', price: 55000 },
            {id: 6, name: 'Primo Passo', img:'b_6.jpg', price: 45000 },
        ],
    }));

    Alpine.store('cart', {
        items: [],
        total: 0,
        quantity: 0,
        add(newItem) {
            // kalo same
            const cartItem = this.items.find((item) => item.id === newItem.id);
            // kalok masih kosong
            if(!cartItem) {
                this.items.push({...newItem, quantity: 1, total: newItem.price });
                this.quantity++;
                this.total += newItem.price;
            } else {
                this.items = this.items.map((item) => {
                    // jika barang berbeda
                    if (item.id !== newItem.id) {
                        return item;
                    } else {
                        // jika barang dh ade
                        item.quantity++;
                        item.total = item.price * item.quantity;
                        this.quantity++;
                        this.total += item.price;
                        return item;

                    }
                })
            }
        },
        remove(id) {
            const cartItem = this.items.find((item) => item.id === id );
            // klok lebih dr 1
            if ( cartItem.quantity > 1) {
                this.items = this.items.map((item) => {
                    if (item.id !== id) {
                        return item;
                    } else {
                        item.quantity--;
                        item.total = item.price * item.quantity;
                        this.quantity--;
                        this.total -= item.price;
                        return item;
                    }
                });

            } else if (cartItem.quantity === 1) {
                this.items = this.items.filter((item) => item.id !== id);
                this.quantity--;
                this.total -= cartItem.price;
            }
        },
    });
});

// Konversi Rupiah
const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(number);
};