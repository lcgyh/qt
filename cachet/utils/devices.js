import {
  decimalToBinary,
  binaryToDecimal,
  stringToUint8Array,
  copyArray,
  hexString2Bytes
} from '../utils/util.js'
import md5 from '../utils/md5util.js'

class devices {
  _connectStatus = false;
  _serviceId = null;
  _deviceId = null;
  _connecting = false
  _services = {
    service0: {
      serviceId: "000000FF-0000-1000-8000-00805F9B34FB",
      characteristics: [
        "0000FF01-0000-1000-8000-00805F9B34FB",
        "0000FF02-0000-1000-8000-00805F9B34FB",
        "0000FF03-0000-1000-8000-00805F9B34FB"
      ]
    },
    service1: {
      serviceId: "000000FE-0000-1000-8000-00805F9B34FB",
      characteristics: [
        "0000FF01-0000-1000-8000-00805F9B34FB",
        "0000FF02-0000-1000-8000-00805F9B34FB",
        "0000FF03-0000-1000-8000-00805F9B34FB"
      ]
    },
    service2: {
      serviceId: "000000FD-0000-1000-8000-00805F9B34FB",
      characteristics: [
        "0000FF01-0000-1000-8000-00805F9B34FB",
        "0000FF02-0000-1000-8000-00805F9B34FB"
      ]
    }
  }

  constructor(deviceName) {
    if (!deviceName) {
      throw new Error('deviceName is null')
    }
    this._deviceName = deviceName
  }

  connect() {

    this._connecting = true

    return this._openBluetoothAdapter().then(res => {
      console.log('打开适配器')
      return this._startBluetoothDevicesDiscovery()
    }).then(res => {
      console.log('获取设备信息')
      return this._getBluetoothDevices()
    }).then(res => {
      console.log(res)
      this._deviceId = res.deviceId
      clearInterval(this.getDevicesInterval)
      this._stopBluetoothDevicesDiscovery()
      return this._createBLEConnection()
    }).then(res => {
      this._connecting = false
      this._connectStatus = true
      wx.onBLEConnectionStateChange(res => {
        console.log('=====》》》》》连接断开')
        this._connectStatus = res.connected
      })
      // wx.hideLoading()

    })
  }

  closeConnection() {
    if (this._deviceId && this._connectStatus) {
      wx.closeBLEConnection({
        deviceId: this._deviceId,
        success: function(res) {
          console.log('断开蓝牙连接')
        },
      })
    }
    if (this.getDevicesInterval) {
      clearInterval(this.getDevicesInterval)
    }
  }

  getDevicesInfo() {
    if (!this._connectStatus && !this._connecting) {
      return this.connect().then(() => {
        wx.hideLoading()
        wx.showLoading({
          title: '读取设备信息',
          mask: true
        })
        return this.getDevicesInfo()
      })
    }

    if (!this._deviceId || !this._services.service1.serviceId || !this._services.service1.characteristics[0]) {
      throw new Error('设备服务参数错误')
    }

    return new Promise((resolve, reject) => {
      wx.readBLECharacteristicValue({
        deviceId: this._deviceId,
        serviceId: this._services.service1.serviceId,
        characteristicId: this._services.service1.characteristics[0],
        success: function(res) {
          console.log(res)
          resolve()
        },
        fail: function(err) {
          reject(err)
        }
      })
    }).then(res => {
      return new Promise((resolve, reject) => {

        wx.onBLECharacteristicValueChange(function(res) {
          console.log('返回报文', res)

          let dv = new DataView(res.value)
          console.log(new Int8Array(res.value))
          let result = {}
          result.protocolVersion = dv.getInt8(0)
          let hardWareInfo = dv.getUint8(1)
          let hwiarray = decimalToBinary(hardWareInfo, 8)

          if (hwiarray) {
            result.ble = hwiarray[0]
            result.wifi = hwiarray[1]
            result.camera = hwiarray[2]
            result.initialised = hwiarray[3]
            result.speaker = hwiarray[4]
          }

          result.majorVersion = dv.getInt8(3)
          result.subVersion = dv.getUint8(4)
          result.minorVersion = dv.getUint8(5)
          let hwType = dv.getUint8(6)
          let hwTypeArray = decimalToBinary(hardWareInfo, 8)

          result.hwType = binaryToDecimal(hwTypeArray.slice(0, 3))

          result.devNameLength = dv.getUint8(7)

          result.devicesName = ''
          for (let i = 8; i < 40; i++) {
            try {
              let pv = dv.getUint8(i)
              if (!pv) {
                break
              }
              result.devicesName += String.fromCharCode(pv)
            } catch (e) {
              console.log(e)
              break
            }
          }

          result.mac = ''
          for (let i = 40; i < 46; i++) {
            try {
              let pv = dv.getUint8(i)
              if (!pv) {
                break
              }
              console.log(pv)
              result.mac += String.fromCharCode(pv)
            } catch (e) {
              break
            }
          }
          console.log(result)
          resolve(result)
        })
      })
    })
  }

  getDevicesStatus() {
    if (!this._connectStatus && !this._connecting) {
      return this.connect().then(() => this.getDevicesStatus())
    }
    if (!this._deviceId || !this._services.service1.serviceId || !this._services.service1.characteristics[1]) {
      throw new Error('设备服务参数错误')
    }

    return new Promise((resolve, reject) => {
      wx.readBLECharacteristicValue({
        deviceId: this._deviceId,
        serviceId: this._services.service1.serviceId,
        characteristicId: this._services.service1.characteristics[1],
        success: function(res) {
          resolve()
        },
        fail: function(err) {
          reject(err)
        }
      })
    }).then(res => {
      return new Promise((resolve, reject) => {
        wx.onBLECharacteristicValueChange(function(res) {
          console.log('返回报文', res)

          let dv = new DataView(res.value)
          let result = {}
          let pushStatus = dv.getInt8(0)
          console.log(pushStatus)
          if (pushStatus !== null) {
            let pushStatusArray = decimalToBinary(pushStatus, 8)
            if (pushStatusArray) {
              result.pushStatus = pushStatusArray[0]
            }
          }

          let originStatus = dv.getUint8(1)
          if (originStatus !== null) {
            let originStatusArray = decimalToBinary(originStatus, 8)
            if (originStatusArray) {
              result.originStatus = originStatusArray[0]
            }
          }

          let unlockStatus = dv.getUint8(2)
          console.log(unlockStatus)
          if (unlockStatus !== null) {
            let unlockStatusArray = decimalToBinary(unlockStatus, 8)
            if (unlockStatusArray) {
              result.unlockStatus = unlockStatusArray[0]
            }
          }

          let batteryStatus = dv.getUint8(3)
          if (batteryStatus !== null) {
            let batteryStatusArray = decimalToBinary(batteryStatus, 8)
            if (batteryStatusArray) {
              result.batteryStatus = batteryStatusArray[7]
              result.batteryPercent = binaryToDecimal(batteryStatusArray.slice(0, 6))
            }
          }


          let camStatus = dv.getUint8(4)
          if (camStatus !== null) {
            let camStatusArray = decimalToBinary(camStatus, 8)
            if (camStatusArray) {
              result.camStatus = binaryToDecimal(camStatusArray.slice(0, 3))
              result.picCount = binaryToDecimal(camStatusArray.slice(4, 7))
            }
          }

          result.touchStatus = dv.getUint16(5)
          result.touchMax = dv.getUint16(7)
          let buttonStatus = dv.getUint8(9)
          if (buttonStatus !== null) {
            let buttonStatusArray = decimalToBinary(buttonStatus, 8)
            if (buttonStatusArray) {
              result.buttonStatus = buttonStatusArray[0]
            }
          }

          result.sealCnt = dv.getUint32(10)

          result.taskId = ''
          for (let i = 10; i < 50; i++) {
            try {
              let pv = dv.getUint8(i)
              if (!pv) {
                break
              }
              console.log(pv)
              result.taskId += String.fromCharCode(pv)
            } catch (e) {
              console.log(e)
              break
            }
          }

          resolve(result)
        })
      })
    })
  }

  getErrorInfo() {

    if (!this._connectStatus && !this._connecting) {
      return this.connect().then(() => {
        wx.hideLoading()
        wx.showLoading({
          title: '读取错误信息',
          mask: true
        })
        this.getErrorInfo()
      })
    }

    if (!this._deviceId || !this._services.service1.serviceId || !this._services.service1.characteristics[2]) {
      throw new Error('设备服务参数错误')
    }

    return new Promise((resolve, reject) => {
      wx.readBLECharacteristicValue({
        deviceId: this._deviceId,
        serviceId: this._services.service1.serviceId,
        characteristicId: this._services.service1.characteristics[2],
        success: function(res) {
          console.log(res)
          resolve()
        },
        fail: function(err) {
          console.log(err)
          reject(err)
        }
      })
    }).then(res => {
      return new Promise((resolve, reject) => {

        wx.onBLECharacteristicValueChange(res => {
          console.log('返回报文', res)

          console.log(new Uint8Array(res.value))
          let result = {}
          let dv = new DataView(res.value)

          result.taskId = ''
          for (let i = 0; i < 10; i++) {
            try {
              let pv = dv.getUint8(i)
              if (!pv) {
                break
              }
              console.log(pv)
              result.taskId += String.fromCharCode(pv)
            } catch (e) {
              console.log(e)
              break
            }
          }

          result.errorType = dv.getUint8(10)
          result.errorData = dv.getUint32(12, true)
          result.mes = this.getErrorMessage(result.errorType)
          console.log(result)
          resolve(result)
        })
      })
    })
  }

  getOperationStatus() {
    console.log(this._connectStatus)
    if (!this._connectStatus && !this._connecting) {
      return this.connect().then(() => this.getOperationStatus())
    }

    if (!this._deviceId || !this._services.service2.serviceId || !this._services.service2.characteristics[0]) {
      throw new Error('设备服务参数错误')
    }

    return new Promise((resolve, reject) => {
      wx.readBLECharacteristicValue({
        deviceId: this._deviceId,
        serviceId: this._services.service2.serviceId,
        characteristicId: this._services.service2.characteristics[0],
        success: function(res) {
          console.log(res)
          resolve()
        },
        fail: function(err) {
          console.log(err)
          reject(err)
        }
      })
    }).then(res => {
      return new Promise((resolve, reject) => {

        wx.onBLECharacteristicValueChange(function(res) {
          console.log('返回报文', res)
          let dv = new DataView(res.value)
          console.log(dv)
          let result = {}
          result.devicesStatus = dv.getUint8(0)
          result.operationStatus = dv.getUint8(1)
          result.rand1 = dv.getUint8(2)
          result.rand2 = dv.getUint8(3)
          resolve(result)
        })
      })
    })
  }

  setOperationCommand(options) {

    console.log(options)
    if (!this._connectStatus && !this._connecting) {
      return this.connect().then(() => this.setOperationCommand(options))
    }
    console.log('无需重新连接')
    if (!this._deviceId || !this._services.service2.serviceId || !this._services.service2.characteristics[1]) {
      throw new Error('设备服务参数错误')
    }
    console.log(1)

    // 0x01: 设置设备名称
    // 0x02: 设置印章解锁
    // 0x03: 解除印章错误锁定
    // 0x04: 印章安装完成
    // 0x05: 开始安装印章
    // 0x06: 重新安装
    // 0x07: OTA
    if (!options ||
      (
        options.type !== 1 &&
        options.type !== 2 &&
        options.type !== 3 &&
        options.type !== 4 &&
        options.type !== 5 &&
        options.type !== 6 &&
        options.type !== 7
      )) {
      throw new Error('操作类型错误')
    }

    console.log(2)
    return new Promise((resolve, reject) => {
      console.log(3)

      let sign = this.createPassword(options.sign, options.rand1, options.rand2)
      console.log(sign)
      let signArray = hexString2Bytes(sign)

      let buffer = new ArrayBuffer(2 + signArray.length)
      let bufArray = new Uint8Array(buffer)
      bufArray[0] = options.type

      console.log(options.sign, options.rand1, options.rand2)
      bufArray[1] = signArray.length
      copyArray(signArray, bufArray, 2)


      if (options.type == 7 && options.data) {
        console.log('开始设置升级参数')
        let ssid = options.data.ssid
        let password = options.data.password
        let url = options.data.url

        let ssidArray = stringToUint8Array(ssid)
        let passwordArray = stringToUint8Array(password)
        let urlArray = stringToUint8Array(url)

        let dataLength = 219 + signArray.length
        if (dataLength > 255) {
          throw new Error('data is too long')
        }

        console.log(ssid, password, url)

        buffer = new ArrayBuffer(dataLength + 5)
        bufArray = new Uint8Array(buffer)

        bufArray[0] = options.type
        bufArray[1] = dataLength + 3
        bufArray[2] = ssidArray.length
        copyArray(ssidArray, bufArray, 3)
        for (let i = ssidArray.length + 3; i < 35; i++) {
          bufArray[i] = 0
        }
        bufArray[35] = passwordArray.length
        copyArray(passwordArray, bufArray, 36)

        for (let i = passwordArray.length + 36; i < 68; i++) {
          bufArray[i] = 0
        }

        bufArray[68] = urlArray.length
        console.log(urlArray, 69)
        copyArray(urlArray, bufArray, 69)

        for (let i = urlArray.length + 69; i < 219; i++) {
          bufArray[i] = 0
        }
        copyArray(signArray, bufArray, 219)
      }
      console.log(new Uint8Array(buffer))

      wx.writeBLECharacteristicValue({
        deviceId: this._deviceId,
        serviceId: this._services.service2.serviceId,
        characteristicId: this._services.service2.characteristics[1],
        value: buffer,
        success: function(res) {
          console.log(res)
          resolve()
        },
        fail: function(err) {
          console.log(err)
          reject(err)
        },
        complete: function(res) {
          console.log(res)
        }
      })
    })
  }

  createPassword(sign, rand1, rand2) {
    sign = sign || 'aabbd853d6294876a484'
    if (!rand1 || !rand2) {
      throw new Error('随机码为空')
    }

    let signarray = []
    for (let i = 0; i < sign.length; i++) {
      signarray.push(sign.charCodeAt(i))
    }
    signarray.push(rand1)
    signarray.push(rand2)
    // signarray.push(0x33)
    // signarray.push(0xce)

    console.log(signarray)
    return md5(signarray)
  }

  getErrorMessage(code) {
    if (code === undefined) {
      wx.showToast({
        title: '参数错误',
        mask: true,
        icon: 'none'
      })
      return;
    }

    switch (code) {
      case 0:
        return '无'
      case 1:
        return '印章未安装或未初始化'
      case 2:
        return '用户无安装权限'
      case 3:
        return '操作超时'
      case 4:
        return '重复敲章'
      case 5:
        return '敲章长时间未放开'
      case 6:
        return 'OTA文件路径错误'
      case 7:
        return 'OTA wifi连接错误'
      case 8:
        return 'OTA固件分区表错误'
      case 9:
        return 'OTA擦出flash错误'
      case 10:
        return 'OTA DNS错误'
      case 11:
        return 'OTA服务器连接错误'
      case 12:
        return 'OTA固件校验错误'
      case 13:
        return 'OTA固件下载错误'
      default:
        return '未知错误'
    }

  }


  _openBluetoothAdapter() {

    wx.hideLoading()
    wx.showLoading({
      title: '开启适配器...',
      mask: true
    })

    return new Promise((resolve, reject) => {
      wx.openBluetoothAdapter({
        success: function(res) {
          console.log(res)
          resolve(res)
        },
        fail: function(err) {
          reject('开启蓝牙失败')
        }
      })
    })
  }

  _startBluetoothDevicesDiscovery() {

    wx.hideLoading()
    wx.showLoading({
      title: '搜索设备...',
      mask: true
    })

    return new Promise((resolve, reject) => {
      wx.startBluetoothDevicesDiscovery({
        // services: [this._serviceId],
        success: function(res) {
          console.log(res)
          resolve(res)
        },
        fail: function(err) {
          reject('搜索设备失败')
        }
      })
    })
  }

  _stopBluetoothDevicesDiscovery() {
    wx.stopBluetoothDevicesDiscovery({
      success: function(res) {
        console.log('停止搜索')
      },
      fail: function(err) {
        console.log(err)
      }
    })
  }

  _getBluetoothDevices() {

    wx.hideLoading()
    wx.showLoading({
      title: '搜索设备...',
      mask: true
    })

    return new Promise((resolve, reject) => {
      this.getDevicesInterval = setInterval(() => {
        wx.getBluetoothDevices({
          success: res => {
            console.log(res)
            console.log(this._deviceName)
            if (res.devices && res.devices.length > 0) {
              res.devices.map(item => {
                if (item.name === this._deviceName) {
                  resolve(item)
                }
              })
              console.log('搜索到了设备')
            }
          },
          fail: function(err) {
            console.log(err)
            reject('搜索设备失败')
          }
        })
      }, 100)
    })
  }

  _createBLEConnection() {

    wx.hideLoading()
    wx.showLoading({
      title: '连接设备...',
      mask: true
    })

    return new Promise((resolve, reject) => {
      const deviceId = this.deviceId

      wx.createBLEConnection({
        deviceId: this._deviceId,
        success: function(res) {
          console.log(res)
          resolve(res)
          // this._getBLEDeviceServices(deviceId)
        },
        fail: function(err) {
          console.log(err)
          reject('连接设备失败')
        }
      })
    })
  }

  getBLEDeviceServices(deviceId) {
    wx.getBLEDeviceServices({
      deviceId,
      success: (res) => {
        for (let i = 0; i < res.services.length; i++) {
          if (res.services[i].isPrimary) {
            this.getBLEDeviceCharacteristics(deviceId, res.services[i].uuid)
            console.log('进来deviceId==' + deviceId + 'uuid==' + res.services[i].uuid)
            return
          }
        }
      }
    })
  }

  getBLEDeviceCharacteristics(deviceId, serviceId) {
    wx.getBLEDeviceCharacteristics({
      deviceId,
      serviceId,
      success: (res) => {
        console.log('getBLEDeviceCharacteristics success', res.characteristics)
        for (let i = 0; i < res.characteristics.length; i++) {
          let item = res.characteristics[i]
          if (item.properties.read) {
            wx.readBLECharacteristicValue({
              deviceId,
              serviceId,
              characteristicId: item.uuid,
            })
          }
          if (item.properties.write) {
            this.setData({
              canWrite: true
            })
            this._deviceId = deviceId
            this._serviceId = serviceId
            this._characteristicId = item.uuid
            this.writeBLECharacteristicValue()
          }
          if (item.properties.notify || item.properties.indicate) {
            wx.notifyBLECharacteristicValueChange({
              deviceId,
              serviceId,
              characteristicId: item.uuid,
              state: true,
            })
          }
        }
      },
      fail(res) {
        console.error('getBLEDeviceCharacteristics', res)
      }
    })

  }



    _getBLEDeviceServices() {
      return new Promise((resolve, reject) => {
        wx.getBLEDeviceServices({
          deviceId: this._deviceId,
          success: function(res) {
            resolve(res)
          },
          fail: function(err) {
            console.log(err)
            reject('获取服务列表失败')
          }
        })
      })
    }

    _getBLEDeviceCharacteristics(serviceId) {
      return new Promise((resolve, reject) => {
        wx.getBLEDeviceCharacteristics({
          deviceId: this._deviceId,
          serviceId: serviceId,
          success: function(res) {
            console.log(res)
            resolve(res)
          },
          fail: function(err) {
            console.log(err)
            reject('获取第一个服务的特征值失败')
          }
        })
      })
    }
  }

  export default devices