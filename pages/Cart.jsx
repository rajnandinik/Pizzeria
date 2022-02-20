import React, { useState } from 'react'
import Image from 'next/image'
import styles from '../styles/Cart.module.css'
import { useDispatch, useSelector } from 'react-redux'
import GooglePayButton from '@google-pay/button-react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { reset } from '../redux/cartSlice'
import OrderDetailed from '../components/OrderDetailed'

const Cart = () => {
  const [open, setOpen] = useState(false)
  const [cash, setCash] = useState(false)
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const router = useRouter()

  const createOrder = async (data) => {
    try {
      const res = await axios.post('http://localhost:3000/api/orders', data)
      if (res.status === 201) {
        dispatch(reset())
        router.push(`/orders/${res.data._id}`)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Name</th>
              <th>Extras</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </tbody>
          <tbody>
            {cart.products.map((product) => (
              <tr className={styles.tr} key={product._id}>
                <td>
                  <div className={styles.imgContainer}>
                    <Image
                      src={product.img}
                      alt=''
                      layout='fill'
                      objectFit='cover'
                    />
                  </div>
                </td>
                <td>
                  <span className={styles.name}>{product.title}</span>
                </td>
                <td>
                  <span className={styles.extras}>
                    {product.extras.map((extra) => (
                      <span key={extra._id}>{extra.text}, </span>
                    ))}
                  </span>
                </td>
                <td>
                  <span className={styles.price}>₹{product.price}</span>
                </td>
                <td>
                  <span className={styles.quantity}>{product.quantity}</span>
                </td>
                <td>
                  <span className={styles.total}>
                    ₹{product.price * product.quantity}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>
            {cart.total}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>₹00.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>
            {cart.total}
          </div>
          {open ? (
            <div className={styles.paymentMethods}>
              <button
                className={styles.payButton}
                onClick={() => setCash(true)}
              >
                CASH ON DELIVERY
              </button>
              <GooglePayButton
                environment='TEST'
                paymentRequest={{
                  apiVersion: 2,
                  apiVersionMinor: 0,
                  allowedPaymentMethods: [
                    {
                      type: 'CARD',
                      parameters: {
                        allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                        allowedCardNetworks: ['MASTERCARD', 'VISA'],
                      },
                      tokenizationSpecification: {
                        type: 'PAYMENT_GATEWAY',
                        parameters: {
                          gateway: 'example',
                          gatewayMerchantId: 'exampleGatewayMerchantId',
                        },
                      },
                    },
                  ],
                  merchantInfo: {
                    merchantId: '12345678901234567890',
                    merchantName: 'Demo Merchant',
                  },
                  transactionInfo: {
                    totalPriceStatus: 'FINAL',
                    totalPriceLabel: 'Total',
                    totalPrice: '480.00',
                    currencyCode: 'INR',
                    countryCode: 'IN',
                  },
                  shippingAddressRequired: true,
                  callbackIntents: ['PAYMENT_AUTHORIZATION'],
                }}
                onLoadPaymentData={(paymentRequest) => {
                  console.log('Success', paymentRequest)
                }}
                onPaymentAuthorized={(paymentData) => {
                  return function (details) {
                    const shipping = details.purchase_units[0].shipping
                    createOrder({
                      customer: shipping.name.full_name,
                      address: shipping.address.address_line_1,
                      total: cart.total,
                      method: 1,
                    })
                  }
                  console.log('Payment Authorized Success', paymentData)
                  return { transactionState: 'SUCCESS' }
                }}
                existingPaymentMethodRequired='false'
                buttonColor='black'
                buttonType='pay'
              />
            </div>
          ) : (
            <button onClick={() => setOpen(true)} className={styles.button}>
              CHECKOUT NOW!
            </button>
          )}
        </div>
      </div>
      {cash && <OrderDetailed total={cart.total} createOrder={createOrder} />}
    </div>
  )
}

export default Cart
