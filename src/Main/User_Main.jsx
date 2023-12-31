import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import Header from '../Header/Header';
import User_MainStyles from './User_MainStyles';
import Svg, { Path } from 'react-native-svg';
import { useNavigation, useRoute } from '@react-navigation/native';

function User_Main() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedBox, setSelectedBox] = useState(false);
  const [timeSelectionVisible, setTimeSelectionVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState(Array(20).fill(false));
  const [isSeatInUse, setIsSeatInUse] = useState(false);
  const [isReservationComplete, setIsReservationComplete] = useState(false);
  const [reservedTime, setReservedTime] = useState(null);
  const [selectedAdditionalTime, setSelectedAdditionalTime] = useState(null);

  const navigation = useNavigation();
  const route = useRoute();

  const totalMinutes = route.params.user_time;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const timeString = `${hours}시간 ${minutes}분`;

  // const handlePayment = async () => {
  //   const serverUrl = 'http://10.0.2.2:3000/processPayment';

  //   try {
  //     const response = await fetch(serverUrl, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         "apiKey": "test_ck_XZYkKL4Mrj9Y4j0ONa0EV0zJwlEW",
  //         "amount": 10000,
  //         "amountTaxFree": 0,
  //         "productDesc": "테스트 결제",
  //         "autoExecute": true,
  //         "resultCallback": "http://호스팅중이아니라못받아/callback",
  //         "callbackVersion": "V2",
  //         "retUrl": "http://호스팅중이아니라못받아//ORDER-CHECK?orderno=1",
  //         "retCancelUrl": "http://호스팅중이아니라못받아//close",
  //       }),
  //     });

  //     if (response.ok) {
  //       const responseBody = await response.json();
  //       console.log(responseBody);
  //     } else {
  //       console.error('Payment request failed');
  //     }
  //   } catch (error) {
  //     console.error('An error occurred while making the payment request:', error);
  //   }
  // };

  const handlePayment = () => {
    if (selectedAdditionalTime) {
      alert('결제 로직을 불러오지 못하였습니다.');
    } else {
      alert('시간을 선택하여 주세요.');
    }
  };
  

  const selectBox = () => {
    if (!isSeatInUse) {
      setSelectedBox(!selectedBox);
    }
  };

  const toggleTimeSelection = () => {
    setTimeSelectionVisible(!timeSelectionVisible);
  };

  const handleTimeSelection = (time) => {
    setSelectedTime(time);
    setIsReservationComplete(false);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const closeSelectBoxModal = () => {
    setSelectedSeats(Array(20).fill(false));
    setIsSeatInUse(false);
    setSelectedBox(false);
  };

  const handleUseButtonClick = () => {
    setSelectedBox(false);
    setTimeSelectionVisible(false);
    setSelectedTime(null);
    setIsSeatInUse(!isSeatInUse);
  };

  const handleReservation = () => {
    if (selectedTime !== null) {
      setReservedTime(selectedTime);
      setIsReservationComplete(true);
      toggleTimeSelection();
      alert('예약이 완료되었습니다.');
    }
  };
  const handleSeatSelection = (index) => {
    if (isSeatInUse) {
      alert('이미 계정을 사용 중입니다.');
    } else {
      const updatedSelectedSeats = [...selectedSeats];
      updatedSelectedSeats[index] = !updatedSelectedSeats[index];
      setSelectedSeats(updatedSelectedSeats);
      selectBox();
    }
  };

  const headerProps = {
    user_id: route.params.user_id,
    user_pwd: route.params.user_pwd,
    user_number: route.params.user_number,
    user_time: timeString,
  };

  const seats = Array(20).fill(null);

  return (
    <View style={User_MainStyles.full}>
      <View>
        <Header {...headerProps} timeString={timeString} />
      </View>
      <View style={User_MainStyles.container}>
        <Svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="rgb(192, 192, 192)" class="bi bi-person-circle" viewBox="0 0 16 16">
          <Path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
          <Path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
        </Svg>
        <View style={User_MainStyles.userarea}>
          <Text style={User_MainStyles.usertext}>{route.params.user_id}(사용자)</Text>
          <Text style={User_MainStyles.timetext}>{`남은시간: ${timeString}`}</Text>
        </View>
        <TouchableOpacity style={User_MainStyles.button} onPress={(toggleModal)}>
          <Text style={User_MainStyles.buttonText}>+ 충전</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        <View style={User_MainStyles.seatGrid}>
          {seats.map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[
                User_MainStyles.tableCell,
                selectedSeats[index] ? User_MainStyles.selectedSeat : null,
                (index % 4 === 1 || index % 4 === 3) && (Math.floor(index / 4) === 0) ? User_MainStyles.verticalMargin : null,
                (Math.floor(index / 4) !== 1) ? User_MainStyles.verticalMargin : null,
              ]}
              onPress={() => {
                handleSeatSelection(index);
                selectBox();
              }}
            >
              <Text style={User_MainStyles.seatText}>
                {selectedSeats[index] ? (isSeatInUse ? '사용중' : '') : ''}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={User_MainStyles.adblock}>
        <Text>ADblock</Text>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={selectedBox}
        onRequestClose={closeSelectBoxModal}
      >
        <View style={User_MainStyles.selectBox}>
          <View style={User_MainStyles.selectBoxContent}>
            <Text style={User_MainStyles.usertabletext}>좌석을 선택하셨습니다</Text>
            <TouchableOpacity
              onPress={toggleTimeSelection}
            >
              <Text style={User_MainStyles.selectTimeToggleText}>
                예약 시간 : {selectedTime !== null ? `${selectedTime}:00` : <Text style={{ color: 'red' }}>(클릭하세요)</Text>}
                {"\n"}[미선택시 현재 시간]
              </Text>

            </TouchableOpacity>
            {timeSelectionVisible && (
              <ScrollView style={User_MainStyles.timeSelectionScrollView}>
                {Array.from({ length: 13 }, (_, i) => i * 2).map((hour) => (
                  <TouchableOpacity
                    key={hour}
                    style={[
                      User_MainStyles.timeOption,
                      selectedTime === hour ? User_MainStyles.selectedTimeOption : null
                    ]}
                    onPress={() => handleTimeSelection(hour)}
                  >
                    <Text>{hour < 10 ? `0${hour}` : hour}:00</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
            <TouchableOpacity style={User_MainStyles.actionButton} onPress={handleUseButtonClick}>
              <Text style={User_MainStyles.actionButtonText}>사용</Text>
            </TouchableOpacity>
            <TouchableOpacity style={User_MainStyles.actionButton} onPress={handleReservation}>
              <Text style={User_MainStyles.actionButtonText}>예약</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              closeSelectBoxModal();
              setSelectedTime(null);
            }}>
              <Text style={User_MainStyles.closebtn2}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={User_MainStyles.centeredView}>
          <View style={User_MainStyles.modalView}>
            <View style={User_MainStyles.payment}>
              <TouchableOpacity onPress={() => setSelectedAdditionalTime('1시간')}>
                <Text style={User_MainStyles.modaltext}>1,000원{"\n"}(1시간)</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSelectedAdditionalTime('2시간10분')}>
                <Text style={User_MainStyles.modaltext}>2,000원{"\n"}(2시간10분)</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSelectedAdditionalTime('3시간20분')}>
                <Text style={User_MainStyles.modaltext}>3,000원{"\n"}(3시간20분)</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSelectedAdditionalTime('6시간')}>
                <Text style={User_MainStyles.modaltext}>5,000원{"\n"}(6시간)</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSelectedAdditionalTime('12시간')}>
                <Text style={User_MainStyles.modaltext}>10,000원{"\n"}(12시간)</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSelectedAdditionalTime('70시간')}>
                <Text style={User_MainStyles.modaltext}>50,000원{"\n"}(70시간)</Text>
              </TouchableOpacity>
            </View>
            <View style={User_MainStyles.modalinformation}>
              <Text style={User_MainStyles.modalinformationtext}>  아이디 : {route.params.user_id}</Text>
              <Text style={User_MainStyles.modalinformationtext}>  이용여부 : {isSeatInUse ? '사용중' : '미사용중'}</Text>
              <Text style={User_MainStyles.modalinformationtext}>  {`남은시간: ${timeString}`}</Text>
              {selectedAdditionalTime && <Text style={User_MainStyles.modalinformationtext}>  선택한 시간: {selectedAdditionalTime}</Text>}
            </View>
            <TouchableOpacity style={User_MainStyles.paymentbtn} onPress={handlePayment}>
              <Text style={User_MainStyles.paymentbtntext}>+ 결제하기</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {setSelectedAdditionalTime(null); toggleModal();}}>
              <Text style={User_MainStyles.closebtn}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default User_Main;