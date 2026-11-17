import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  ScrollView,
  Alert,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { useSelector, useDispatch } from 'react-redux';
import { loggedInDetails } from '../../redux/login/login.selectors';
import Code from '../../constants/ColorCodes';
import styles from './orders.styles';
import { API_URL } from '../../redux/const';
import { 
  getOrderDataRespReset, 
  getOrderDataStart
} from '../../redux/order/order.action';

import { 
  selectOrderResponse, 
  selectOrderResponseData, 
} from '../../redux/order/order.selectors';

export default function OrdersScreen({ navigation }) {
  const dispatch = useDispatch();
  const loginData = useSelector(loggedInDetails);
  const userRecord = (loginData && loginData.length > 0) ? loginData[0] : {};
  const orderResp = useSelector(selectOrderResponse);
  const orderResponseData = useSelector(selectOrderResponseData);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isInvoiceModalVisible, setIsInvoiceModalVisible] = useState(false);

  useEffect(() => {
    let getCustomerID=0;
    if(userRecord.UserType=='Admin'){
      getCustomerID=0;
    } else {
      getCustomerID=userRecord.UserID;
    }

    const getOrderData = {
      shopID:1,
      customerID: getCustomerID,
      databaseName: 'General',
    };
    dispatch(getOrderDataStart(getOrderData));
  }, []);

  useEffect(() => {
      if (orderResp !== null) {
        dispatch(getOrderDataRespReset())
      }
    }, [orderResp]);
  
  const formatDateTime = (dateString) => {
    if (!dateString) return '';
    try {
      const [datePart, timePart] = dateString.split(' ');
      if (!datePart) return dateString;

      const [year, month, day] = datePart.split('-');
      const formattedDate = (year && month && day) ? `${day}-${month}-${year}` : datePart;

      if (!timePart) return formattedDate;

      const timePieces = timePart.split(':');
      let hours = parseInt(timePieces[0], 10);
      const minutes = timePieces[1] || '00';
      const ampm = hours >= 12 ? 'PM' : 'AM';
      
      hours = hours % 12;
      hours = hours ? hours : 12; 
      const formattedTime = `${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;

      return `${formattedDate}  ${formattedTime}`;
    } catch (e) {
      return dateString;
    }
  };

  // Handle Download / Print PDF Invoice
  const handle_pdf_downloadInvoice = async (order) => {
    try {
      // Base64 encoded Aavin logo
      const logoBase64 = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wgARCAD6AUADASIAAhEBAxEB/8QAGwABAAIDAQEAAAAAAAAAAAAAAAUGAQQHAwL/xAAZAQEAAwEBAAAAAAAAAAAAAAAAAwQFAgH/2gAMAwEAAhADEAAAAb+AAAAAAADBF+85qWvI6WZP164c9jl6P6Ua61rPqxmGcAAAAAAAAAAAAADBGe8qTn41spefCZp28VW1/EE/NZX7h9XK6R6Ue6Zmn7CGcAAAAAAAAAAADBE+8fVKfGtlLenatrIpXgPOl3f4lh5rKIvVy+k+lFuuXp+whnAAAAAAAAAAYz5PNCke2tr5Obdq2erYznEVTuSqkR1ur0dzTY656Iqdjq2fWkXvw685zK6mrq5fS/utWTH18jiQAAAAAAAADFbsdAs1dKRjrrepS30hsrU0qzjOxkfObHYIZef/AB0nRj7onvtxturfd/nl+zNOPpPS6HPBqdC5xb+uJ8Z2mAAAAAAAABrc7vtB0c376NQugcd5oV55v57iy1voU0O2MzUA8qF0Gt2alWtdUmL1K6V2xRebpUecg5PUy72MbaAAAAAAAAAjqF0Pnmjm7t/5t0eOT55v0zn3vmr0bnFtkjsLGc3TAxX5+jWKsZLxFo0KNljJOAy9KoyUbM62XdRi7QAAAAAAAAHxzzotUtU67dqTJXKl7rlhZmnzT0loXYyLpMczuNC9OfH1T69j0r7Otk/fQIycz7+KXZ6D3xi1VfoM0W2MzUAAAAAAAAAxr7B5zfyuVO2MizWXmdkq2LPX5/7qXOd+978LVXPPOk68UlNtMlnzrHx5U7z3z0G3q5cpbvDYyNYI5QAAAAAAAAAMQM/jrjmnxeqnqZaw1F150b25ns1bHRMc+8vOr3CVnE0Pt5JqxBoXb02MvSyILIAAAAAAAAAAAGMfQhIS6p6/OPHpnjYr85z0P098oMpbkMsdJFa0a+TYHnQAAAAAAAAAAAAAAwZxnBWNORqmnl9I9arac+/TPW05mh9jFa3lgZfP0AAAAAADAj9Cp26dl2YXRmg37BSLv51LRunUopZzZjPKxX9J6nWY3oaEd83OoWOPi7mtPZio5I6yVO2Tw+cL9x3fEzqbXrx3EXKj2Itgy9UAAAADERL0KetofflO6mbaef2+l1bP3c679d8RX15zE8NsolzolS1m1wWzLDDkhYhuFdstDz79nrNjqk8GegU24xSUXyxIXat005WrZOnW7jVOh26vqM7SAAAAA8+b9J59eoatiru5bqbkPJaBY4GzwcE8ZLxG3Yr7sPORHPU1EWHXhlrv1hcq/e59XCpag61bIX3yR9/WJhlhrHC3mSP6oEjE9eWW0aG/n38iOYAAAADGptnkRJ/eeuHz9ue8eXtjxHb/ANOuTLzrDJ7ot11xjOXPeGRjH0PmMlPLqPm+xsXHUy8buM5OtkOgAP/EACkQAAICAgIBAwQCAwEAAAAAAAIDAQQABRETEhAgQBQhMDEiUDIzNBX/2gAIAQEAAQUC+FbtRXBRE23sR5qVLc1zA4Mf6K3aiuJmTC16/O04OxMxxNS3NcgKDH+gtWhriZkw4GSmnX6FZsavjOVLc15AoMfnWrY1xYZMOImZp04QPpMRMXafSWVLcoIDgx+ZbtjXEzJhcc5Sp9Uewhg4uU5QWVLc1yA4MflW7cVxMiMuMp0ur3kMFFupKCypbmuQGLB+RbtRXWRSZfvKVLq9vPsMYMbdWa55Ttyg4nmPjGcAD3S9ua+p6vvLRjdg88lhlnM4D2rxOzKMU4HDjFiwHplDc1ljmPjbN3A5TR3uj0u3uJ/fr4z6qaaTrWRsBl6v3JxZytizhgfFtM7LOa9PXXy/Y6VZxzlfW84CFrjxjG0ktyzUOv6IaSGrOGBl1XTYzWM8kfEcXinAjyMY4HLjO2zmtr+0xgxsp6HZq28hm1D+GasuLHxLv/HlWPK1h/4T+8QHgj27UP4ZrS4tZsI5pZr54ufEu/8AHlSeLeM/1eip5V7dqXCc1ozNvL88U8oRzc+JZHyr4BeLBnkcsr635rXwS/bdf3PzVL+2bQ+EZrB5t/EmOYeHW/KDeyvmyr+Q4JkBVbouj0mYiLl/z9ACTJC4SrNi3zsZqw4D4u0TwWUrHQ7JjnLlOUlkfaaFruHL9qWHkRMzRp9UZadCEzPMjEkSF9SfiuVDVMXK2ZQt/bJjmLGtgsYhqspF422l4p/cppOdlemtHoZQA2rE2GZra/kfx71XuD0q7DjImJjP3nQqCmOYhCh9WuBI2rZWJyugnsWsVh8i5R7cmOJxNpqJVs1lgNBnsZZSvG7TDYbSxFc3mhAID5Vimt+PqtR7Ie2M+pfhNYfsr6824pQKH5nHOO1yWYzXODCUYewazjxesZOJpqT/AEXHOSpc50KyAGPaxy1YtoNj+iv2mrcnYtAlnDBzZeX1Wrgu/wDotmnkc1bC5wgA8EBD28/BfaXXj/1vvOzT1zsbEzReb15YuLRhbRszG1jwK/YKde9jgdsFKydo6Zrv+sQY+B63iKlrYzEy5s5rXEcWdjImVt5YjYGoG23NkWmM0rP1C/zXL3VkzJTUpTYxwQt2a8PCpdu9WTMzNSpNgraxVYymPjr/AE1Qfx2IeNrVzzX2MANjNUHCrsDFvKVPvy5RhI5qv8/y3rPQr94ASw4gUpYXmwI8isOirWmZnBGTJS4Sp59j4+82Z+n1/pWV0o2hcv1seNV7O12V19SGl5uiOZSvqVsJ4p5rVeCPy3G9lnNYHk/YN66+UA87WwZ52c1weVq63qrZTX2WdizzsZSCDtNcKQcztaUyjV5TX22rR9dbKQedvNo7mVBLWgMAH5C/xP7nmqKILYu7LGaoMf8Ad+a5kBZ2Fjubmq47X/78ieMIyLKiO921n01Qx5bRvAZq1/yc2ErYcsPWI/NOWFSp2IS1hPptTkCUzr0NTF5MqsYmu10u1xguFHJUabFHfqFB+lemx8oQKA2FdjpijYnKlI0HfS2HqQbjSqEJu2u88qcfS/mahboHXIGRGBjPGPQ1icRRrxMREe06qDwaiAzj28Zxxl8pGpikm4qyOhX9If3FgjD0iIq/B//EACkRAAICAgEDAwQDAQEAAAAAAAECAAMEERIhIjETMFEQIEJhFEBBIzL/2gAIAQMBAT8B9hmCjZjWG2wCZO0cMJTcLB/QZgo2ZbabDMejj3GW1ixdTuqaU3Cwe8zhRsy202GY+Prub63UiwTuqaU3Cwfv3b7TYf1Mej8mjOFGzGzFHgQZvyIlyP4l1IsH7gLI0rsDrv28p+KamPXzeOwRdyyw2GJis3U9IcM/4YQyGY93MaPmZdf5CYj6bj7eYe4TCHQmZjdAsxU5Ns/XKTa8pjtxsEvG6zKTpx7eZ/6Ewj0ImYPBmI+m19cp9JqULycS46rMqG3Ht5abXcx7ODyxA66jKUMx8jl2tLbBWNx3LnZmNTwHIzLs/CYibffx7ZG+kuqKNKMn8WjVrYOs/iabamXUGwjrK8dUlt4QfudztKa/TXXuOgcaMtoZIl7pBmfIn80fEfKdvHSKrOekpoFfU+fffHRocP4MGEfmLiIPMVQvQTkN6/pXO6WeZU/NdwY//Tnv27snj0WetcF2ZjO7P1MuyePas9S0Ly3KLG59THyXMtBaoOYzEUgrMYk2S21+RBM1aU3/AJMZyH19+TZwTpEXkwEy26hRKzwrLfMQcm1MttaQRO1C0UbOpksAnAS46ULMUaBcwDk0uISuYibPL78weDKmKsCJZyLbMsU+kJWSGBEtD8u6NW3pD6U0Fjs+JejGw6EPJadamNWeXKZFvNtDxKVCoPvIB6GKir4E1NbgVV8D6+mvnX2OO0yqvk2jAOI0Ps//xAApEQACAgIBAwMEAwEBAAAAAAABAgADBBESISIxEzBRECBBYRRAcSNC/9oACAECAQE/AfYVSx0ItQprJ/MxQHQoZdSaz/QVSx0JTSKhMm/n2r4ldhrbYnZckupNZ95VLHQlNIqEyMjl2r9abjWZ22rLqTWf17tFPpr+5k5G+xYqljoRcNj5MOEfwY9Lp5lNxrMIW1f1LEKNo+3iJyffxMizgnSIpZtCVVLWI+Wi9B1gzR+RAVsHSZFPpnp4mHZ/4MzU7eXt4Q6EzNPUCYS9SZlvxXQ/P1xXKvqZK7rMoOrBLxus+3hHtMzR3AzCbyJmISu/ripyfcyW1WZSNuJcdVn28N+La+Zk180lblG3FdbFmRjce5fEqqNjalaLWOkyruZ0PEw6+vOZj6Tj7e9Si0WLMjG68kiOyHpDl8l0wlF4q30lmQzymg2H9TtrX9S2z1G37iOUOxKshX/2WY6P5hwvgz+C3zEw0Xz1jOlYl15s/wA99MixYM35E/mj4jZjnx0jMW6maOt/0qER6/EtTg3GfyP+fDXt04vPq3iehSzcRMlEVOglGLz7m8T0qS3DUyK0CdBExUEpIS0oPEVVN5DTJVRXKqU4g6m6RZr8zKrXhv78avm/WWtwQmYa+XMtX1LQvxHbghMw13tzLO+wL8R24ruYqln5ygbZnmWdsEEJ4JuUgvaJmP04/fhEbIlyhkIMqKBABK3BuPWW6KEGUsnDSmLavrHr9L7wg4r5mPYgr6mDi9/LcyrRx4iY1PBdnzLXLOSfvBI6iMzN5P1JJ8/Xm3jf2Ie4S64ouxCd9fs//8QANBAAAQIDBQYEBQQDAAAAAAAAAQACEBEhAxIxQVEiMkBhcYETIDCxQlBSYpEjM5KhcoKi/9oACAEBAAY/AuC+84BMLjUuCPIzUsWHJXmmYPyPV5wCLnGZKBybVObqFIqR3FNpp8h+/RFzqlSGKl8Rxh4zRTOEjVivAzB4/wC7IIucZlSAqrzt/wBoyKvs3D/UJGrCrzTMcb9+QRc4zJh4j9/28sjgrzashI1YUHNMxxchV5wV5xmSpBX37/t55ETCmKsMNWaIOaZg8T9xwV5xqYeI/f8Ab0S1woVqzIwkdwqY4cuOAReYeM//AFEZbztAqG6OSm5xKxWy8jupWonzCmwzgWuFCiw9oeC7LDhxZDOpgAd0YxNnZdz5MI3mFT+LMQmN5sA8ZIOGfDPd2gDm6sJN3nRvW38VJrAsAqtkeSni3WAeEHDAwIyNRAt+k8K88oAalAQcchQQ8Z3by3TgUW5ZQdZnKogx/OUC3UcLadIWY5wd0ixo08zH9oAaiD4M4W06Qs+sHdItPLzNbmTAHSD4WfCvHKDXaFAwe2HhHEYeam62gg+07Qa3UwnoOGe3nADNtIeK0VGMA5pkQrrqPjMo2dlhrANGKDBlC6MGwc/WnDC1GdDCu6cY32DY9oTVx28IeG07Ix5wkFffv+0C7PJTKAGJTWacMWHNFjsRDwbQ/wCJhVXrKh0W2whM6yTjyXNYSGpU8XawvOMgFP4RgIeK7AYcRfaNsf3EMtv5KYjeuNn0UiqWbfxG88yUsGaQujudEGNwHE37Pf8AdSOMNl1NF+oC0rZeD0Pk2nhSsm9yrz3TMLre5V1vc68XPB2q2hTUeSlq/wDK/df+VtWjj1PknabLf7V1gkOOm3ZPJbMnraYR28lLNy23BqoJnU/I9wL9tv4VGjy7bgFsOB+R3GG6JLbN4IObgYVwlRE/DL5GLUZUMHWciW+0NoA9VsgDpw20Zu0CrZf9KYne+lUIHKSJfrCtXaBbLGyVbM3lvy6J/iGclJu27kqBoTmuG1mi05KfOqu2P8lM2jvynNcSZZlFlkMMSVW1PZOD5v0mVV5HIKbXkKu8MfXuWdXa6KZqVeJkxPYMBBvOq8Oz3/ZTKr+2EWMwELZ+s4vfrRT+pO5OQDBIyrBztSrS7hC++jV4lnhnB/T1pN33QDBiVIYNCc7UoDVADelIKZxQaMTRBowCe7nBtmMTSLWZ5po0Cc46zTn6wa3knu1Kkms0T4Xvq9ZxyFIF30hSGLoN5VRGTaQB+kTTjmaCDRpUq7k2kGz6q84ovOaaMyINGlU88oMHOcG2Q6lNaM0GjL1T0Rg8Zq6MGwe/sn9YV+ISV1u62D9ZJ/WFFtElAfDmrNsLQ5ptnrWDrTsi8ovOaNseg9dzTD9OfVV2hqFIAzTi+gOSP0uwhsN7q803jmFINM14j6UwRtWCYOMcJN1V1qaWNnJbn5V4v7BF5q05q60FBqk3cGELOX0+vttmsCepUmiQhhCTgCFPwwqeWbrMKlmPQfdhdYFcnP5KVKQlNC6AOno//8QAKhABAAIBBAECBQQDAAAAAAAAAQARIRAxQVFhQHEggZGhsTBQwdHh8PH/2gAIAQEAAT8h9DcwymAgxyz7xnHBFkWrPTzAm4An7FcppX+gZvtg3GodBGM+JHJN+y3OoMuLZ/YeMq2hw1MwmdpwQb3YtEXKbTjzpnuu51BgsgT11zujhamIbUrYIQMXHGjILHiJUW2jMtGTrzAlg2fW0EbULyygkAWsMxz2PhOTtbk3IL9NMsd0deYEBdk9XjhsnXvFaN0sEtFrwQyGL2PjPzIUjK/qsPXh0orab9JxFk+oZgGdp/MfIUysBQG7xCAIrY+Bcp3L1Gg4El0Mv/DS5a7x15hEljyenTWgtnJHsdGm0G//AE0ub0gKp4r+8Ys3as8z6xT5Ns+kpAn2GVSjS9tDbx5dk2iqmcn49M7R19Ogpxye2CtipcZFnY/xFUq6VbiPIz5aiGCStsDQJC5jR3Mq5tHG/Ssa4xdNLt7Wi2VYjxGCVBaxSInhKaPyl5/FA2nswi9tOoPudk2qy4yltAult+x6Xxaottu88JhK72CtM6aALYXwfhWDYZiq+S8aMi/iRlpDJodKel3XwLA6bpRW15YFwsAA/FcDcdDd5D+dNoZKfvp7js+3p6uLBPvcSmoNI9MEh3HxCE7nQBbBX6ae86PvpQvK/b057xQMMjZLjkqe5uNLQfnHwrRcurXoCiDfH+YzNnfpRdt/j0pIOzFR4Wl2PI0YLmH2aMw2VQch18MNtHSAHLKKK2vfQO7TOE5GZosa+el5m6npXaUOxoKJXH/aDeTaAKSxiiwtCaDSRLPHv2aKKj1oUItepgjLY0eyIPMRmytzdSKIJXDPptjUfSFpSaHTINz8aAgLGIqnc2iFeQrEVpzYe8qvcUbu3UoG8zGjzNFgNwsf5GhYK4/d6d2n+KSiI0lMFGziVkY2P7Q0gjyaICksgACOyQDBY7kdsj3BpUSPuysLNx299AeE+ggK0VHqGEE65H+949Qg3HT6wvJMN2Lc+BrLljTTi7Zif9T1LgG70qTjk2IbDPJy9Wao8f8AmIuX5bXb3mzj55/0sGoL3Nd5XXffQGUOvWVECkslgF/yfSZ4B43l9gu9QK0FsQr54qVqR0ZY9fzwlfsKBSD7zdF+WgNmPy+EAzu1ywA+P2JmHVtZzCB3N7xKL2IzKyxeG0cPAy/YL15mfSaD5oXoMr25D69ta3LlHZ9D7cDeh4Hx/hLQupExlOkVX2UxoHSlYaejay08TTiM3D0NplRMpjj7RsPnLod1VwS8BQNo+PKRgJUFVotrxv8A0ju4+c39yIZtrqLL/avxLIB3bEswHZRAyL3iL/ffrMG3nYOVW3XmbErkMsupUrOqLI9wwjS13WWa5uPcKSi2m07IH2GqHCR9EugYF/OULhPxDg5FdnRU+o+UIOS3350y7BaxzLuOdB40LfxT9bMHAePMVVra8zeNahgKk9/SKXuqlSew/wAxFVU2rCKtaTZ+d55lUFAbrULExP7aBe28wNgfVA5PJOLS4Z7lAtA3hDcWZ5x2UAyrAE4QLHNH30uWZf2/VZVzkpoa5ex7z2+5zM+2kvjFp5sIyFoDV1ihbh/laC+0fsjWkcHcXnraM3H0150uIsyQLOth89Omj7GZUsBt/gghboImBX6rpvKKy96IfcDMkWdY70xe0IlL30peBkfeCDXtPboEj4JbP20RWkeyfc1Yrxi37ZSB5dOgVEAVyrHjTO9jCbFJ95uuq5tH9ZNidzsps8mmDx9FTLCJai6VOkEyo1ktaAbK52BB1K2D8SzX0qYqDDvN4gicSp7QI+6Snvu9zDas5nOT6JVtkp5IBrtRxCPknqFnYysa2/O86eN0+v654Ly5lsfDhTj0BKgDYB9pUTvXCSpLvKsFoAHBKlSpUVs3sxGbv+c/mUlSpUqUdyA2BE61tDXXOhNq8vBBILkvrGH6ABJZUUAuAISC9Cpx+h//2gAMAwEAAgADAAAAEAAAAAAAAOlyCSAAAAAAABBBBBBAKkInb/RBBBBBAPPPPPOI1SVPGiENPPPPKPPPPPMdD5wWX1DRvPPPKPPPPPGhDCOQ09Dp/PPPKPPPPPAbdghLF47AtPPPKPPPPPImuKnOAWBVXPPPKPPPPPJ/vAOpP4fT/PPPKPPPPPLoP/OZeZqqvPPPKPPPPPLBHwG1NiC3PPPPKNNNNNNJMPHTv5tdNNNNIPPPPMMMOMJBFfmtOMNPKHHHCHh5gqKPH+CZbDlHCNNNE3Tufti0fEC+JyFNIPPPOUwdl5eb9oAu4/8AzyhBBDppHYKGDHDBA299BAD/xAAoEQEAAgEDAgUEAwAAAAAAAAABABEhMUFRMGEQIHGRsUCBodHB4fD/2gAIAQMBAT8Q6D96CDjS8EbVWJwJ3PoHz0Tt/Yj834lofaJxUncu51m70Tt/YmCedjxybCaM9Kk4UNTqKBbKSaNIYH2v3Ls0RDW/EC/5ZrrPE7RaMsRhISPTahqwCHQyxQtCW1hWghy7pSXCTgxCE9JjItH56bUdp+ERgG+YfCfPiPOIncY94JHi/aWM5OmW7t4Jfs5ITPfxBtzKl3v2hJePnEqfc6bEdoQLo4YzmvuEiI19mXlrt4fG3B+IVA9WJxemAK0YiNtoQH239zFFyxaR3jYUCZrVlW14ReUsEd2/Ur7Fb1OZiBxxP69jRj8oJWCVsWwzU/zTrVMvVPaP/RNyJlGsGpom6l8fRMKXbiVspxLvwuX0DWs88RKbDpgmRCVLjqc8RvuDiJsiAuvaJ4aO01ldI3lfMGZ5iNAO2kcnwgy2HzrRqcTvYwNiCKRqqJT82BsBHzjg/mOfKB/8BH4ct9WHsyMZusYhxRL1bfPnZNjMIi+0KRpYN6qlv7wqbSKaMstyVS+zvCFz/aJCe0Ojl1jgtCcYIbHr7+c2iyaFEpECmaRErwyYL9PJijGIDtghhpHk/8QAKREBAAIBAwEHBQEBAAAAAAAAAQARITFBUTBhcYGhsdHwECCRwfFA4f/aAAgBAgEBPxDoAjtYkNmWZKcyjuR0f8AQ7WXx13Ze2Hn9IQ8gZR3Js9Y8drL7vuzOfG7z/wA+tnMm5B54/PzOdLR6gK0Q7HVrGSmN/aU5th2I84Y/T/ZpPHO0uOzqSouVFW108q0y8Zd7nBBWsyhni8xym3lHNVk3yGZ3U+VNfvCWg6mPDpl3z56zw9DeLiOP8n1M3w+sC9tn8RWnPriD3Hp4jtlHYIV92wkdvqgjQzAdzj8xRnMsPY9Oxf8AURK1MkFnaXAyMovfjiVLjmUuA2d5x1rQwQCGr6HTErNSdqt41i7z2ludS01htALWWY/Q4JwbcwKWgjq9Nu7qX3h9OOETsU8kcfXIWZEQv2pmbRHaMcPfr427O2Y/3x2vPMUTzRK22bRj/EPscPMV1E4sqrpsNLzM5HNaWY+CsYGHYczDMjP9lbAVAx2wvJb2ztD3jDUv5vGODaoXeDfWGG5evEY65PvHiGZSO0etxAZ0FsqHYichj9wcPk/qAi2LiVfFh8o0d0X5a4SbAjh22+srJ1c+H3mRriMRRzEBsJVdrqvCFhoYEYBMWtYHibTDEqeyEgBj1oGntCXsvpOY3p0JBGymapMuCjZNXL9cWSu/7KEc5IDDLFatX7P/xAAqEAEAAgEDAgYCAwEBAQAAAAABABEhMUFRYXEwgZGhscEg8BBA0eHxUP/aAAgBAQABPxD+ig1iYQmt7vSKVYcmzHab2sdiz7gXdJauHX59KDgLYEhWcf8AwaRPQCM4HnoixFfo2raKqxqetUe6QeRQOu0OTH9QZa9fr6uSDcLYMG/Hf6CkQAiubTq9I6E7L8do3+uDNsHAaa548olnWWm9Oaoxd4czKcdTK5IUshDWWJ4z47Gow7l93pFpLtX4OCJEWgWrBAvnjoOsKjGIIAVKMJxHadg1XHaY47wfvENXCF4HYaMu/wC0tEUrWIhH1NOr0iEbBX4jdkUBuwRKFpkD9wMfgU89JvFROCTXpZr55uELg/zIPdb3UG3xHxVwzFNMunV0dN4o4rRlhdDqAtXioXcOUP29ZWJt+DtmI+MBhI26om4bq6dtJmmet6iGRBYP7mDf9fAZpYdHdOrpHOsYDLtKBqsB6V7ZfuBRLlm8obneC6F85rwwbJtBQNY3iqxPY6ppnHSWNrVWvh+5ggAWJYnP9ZlwZk6Ef1yr0ohpzCNfFpnHL6lVtGElP0LuwUK6BTXu+Jexd2fdgTYPWDqcNpSu+ibO4T9Q0lh61NzuTWBkFScdTrL7KN7G09+YZDqkwIy1vuPKD/VEcyAmxoevxMaGDiOoOe54eekpgADAGkRzMKFksnR/sRorlXV6w7QoAV4CBLC5UEb3uahNRCBs9E3hRQtbo/5HOJiYq+6bkRNbvRuPu9WNyIPZR4T4boioSKrsGKmtQCDdkNDY/eYhNZ9IajdittbXKwgxFAbwrC5MD5v1Cg3dq/MaRY4RLggc6O7FcA078RxrFJYa2t6OvYhAIiayl9enOpOrHTsBfLQ9n18J8MmWsJ61RHbWNrOLvUGBphDyI4FjlXWrgIlPSVL0VRvuwCpR/FEJ64BIyyp6haTK3LVCjuMPvUFkLLmScJ/wlZ84ii2cdRH4PCfDRRr/AKImHvCT3PtmGEjnaqPRj5so3zmKyjLpA4fUCW/MND8EzBCN31l/UW6TSCXTtwP8fwLMlLphEpqAp090jwnwzf7NSXWesDSRn6MVsNgbj7MZVtib2NkJ4isNmkNPwXMEBoHQG/kmNvKEZfR0UfKQ1m0PtAl3nnM6UegTNvBfD6gP2z9RKM8TiJCujNBZDzLhERYlMV60G9jmH3iYk7UL3A7fcHB/N1DRIAXbDfmH2Pn9fxUGALzm/pFREApRTkC/moahP/ca/wCvCfDAqwpOkACn0i2TRh5I6FzW0cEoZKk32P7zMbRk4WlpDVQzauqf5/BcIAVqUBLUEdn2HSN6urrKjfAdGABjI8u80zppXy1gDDywKPBr5ZPCfEFaKsRo7MyZlreh8G3k+LgkQVom8SmBSJiOOeqB6O07eUEKVhGqY9tXBdr1JeLjPnEGrb54nY9doKe6gFsDT72XHeaRSpc6qH8N4u8MKwAdYUWRty7+E+GwH84usrZO0TeuPD1OjC70uM2SI1OX10l3ByCpHRjTE26ztxHFHa1F5xfNK5qYfdxEyLFbYiRZQrjW46DTk6x0NWDiKcnp24hiD4K0YCa4COA5erDUiKFRXne9iAHhPimciFoa8HcjJgtI6ifukBIjoTWXD07Pj/qCjaxLH+HAE1EsY8dLEKYNAVJkSHTZsosgNo4I0GNDXoBvFqWK2ngw3dvrDndSrHJCIVR9/wBgFQJplngH11RO8EBSPaOddvaF7lObU8ue0ECrDRX0L9oVZVXQKdyDe8uINy4C9fD7AzDUa1j5jd6xzuoWnY0JdP8A7A9ktix9Xd6RizqFnkf8lZv+ygCzGwKNV+0VnPQlp1dvOPDOsG1lmq+YcApoGKfvH3LQlso9Jia8wFAF50iG6NbPTg7wDjYNT1Xd6wE38R8ekfmTUSKO7yC7MdL16H/Yn1GQPWYHX1lQm9NAMy8P+rWL4Ir8htA1V37eXEBDEc9f7tEqVxnAuMvp2f8AmICFJpQxCiJCOI6cidZXKtV6eI/1KlTVLCAKWU9eNvKCAv6Q5uC1Na/glXoC5wXXncsTTOKuh38R8O5cuX/Ny5f8Ll3mVc4A3ae8aPLmbJA0sXXvBzCQUcANRCEcoBcuX/BplaOsAYHsy8fk+CykKhYrX+HeXgUvS2PpSG2tJivcs94mbPgCHS241DrEVcWiK104bJ34ijhXugSErYMLG9Vye8OBssPXsv3jCBWkGkbuu0aBDCvqf4uNrVxcvNvPlOtuUgwnn8Qb0cfvlDwyS6Lr5TcPBM+jT1iZdytDzKYPcI4rWjmVomF7mGjvvFqMcZHwENR69Yb2u2mJkPOHF/sLjW8OvMvMMDoiNLaJ6QweLshLjR1j/bLlIqLVLFygch3Dg6x0EYVlMTRl2RFK/fKOUC+3fbvUca9clb5Y7uzrPg+3ylEDKutO+YbDbSHV5anq18x1M2bRRq8xr4IdXJr1g1EFvOhjKhRHmH7j4HQNIuMG+scUb6PeIdgA43fJBILecg+64Ob4lFFWGC96diYvcJ22wI9+Zp6TW6odm4aeItM0WWLrTeHjshXzD1wS94TTZ+AipNreT9qWlU/VMriGc1nsjuVI2q5tZXqAOq1K+TJ5Oqx0q01cGD4iirEDvNMhXenP2POaBGdajjrLWBbpu8vvDrWWu7/yOZox2APqPBwhsGCIatODmG9SFnLlhF3Qt8LiMUoADdh3gGKGru+bAvgh5pLrHSJq9B6MH3DT8X89sVBfQP8A2G3BM0IvQsfFxkTJXtu/Ec+aGwWa8a1/7GG2VF77y2rdYahYgPaj3ZRlB8x/WftxxekA/SOwUYbbn6mPWJsGMd6LXqEAYF5MrYCXaGboOJc0cJorN6XUrQPOZyFT0P0ljTGxqOB7pFUvllnbr+nSaJU8+70HvHJKZpobwwQUB0hp+L+bBaiHpEVZW+81YswCbdhz8wEHnKxy98eUONdoOKOeirP3GBVdTvHDCziNjVOj4gQwIDjcfr+KhKE5at/UsybdbvFbgY7bEpIjdJpc1E6omrZt56SxlGgeR9R34jGo0BuD++00xdTs586mMF0EZNwae7rXp7xz6HBy2I9l618Swb0ye7648oGH8n8+DRTB03pyOpHbaGxQ1KgaZYy3XmS+0NKGgWe00yNlyPLxtGn7hNvWV+8weYGl9QylRNKr7QAw7XfpA6KWS0PPEV+vcVz2jTUzvAXR6wCPdJA7czWk1fVcxlwUACs+8Xo6xA95tHwrO56RUkARQcdIk1bkMDmLKA2sW7sV5g4b9Hs4hbgMnMSxai10F+9zT8n80uVhDTQOyTX1b0HtUPk2lAlfKNlTVKXKVNRqVqBkA2UHouYLx+AoJSVvEpEuNplbtoKe9VcqCci17ZQKqADQJ7v5KxAgI4pLh1GOhU14CtiQ9lwGwzbwa9otM6mA5WJ5LsOF6Gx4x/G0P6Y6QBSZCWS4XOCGvEpCzQj2hG35/wD/2Q=='; 

      const htmlContent = `
        <html>
          <head>
            <style>
              body { font-family: 'Helvetica', Arial, sans-serif; padding: 20px; color: #212529; }
              .header-container { display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #1C7ED6; padding-bottom: 12px; margin-bottom: 20px; }
              .logo { width: 90px; height: auto; }
              .invoice-title { text-align: right; }
              .invoice-title h2 { margin: 0; color: #1C7ED6; font-size: 20px; }
              .invoice-id { font-size: 13px; color: #6c757d; margin-top: 4px; }
              .row { display: flex; justify-content: space-between; margin-bottom: 20px; font-size: 13px; border-bottom: 1px solid #dee2e6; padding-bottom: 15px; }
              .col { width: 48%; }
              .text-right { text-align: right; }
              table { width: 100%; border-collapse: collapse; margin-top: 10px; }
              th, td { border: 1px solid #dee2e6; padding: 8px 12px; text-align: left; font-size: 13px; }
              th { background-color: #f8f9fa; }
              .total-row { font-weight: bold; background-color: #f1f3f5; }
            </style>
          </head>
          <body>
            <!-- Top Header with Logo on Top Left -->
            <div class="header-container">
              <div>
                <img src="${logoBase64}" class="logo" />
              </div>
              <div class="invoice-title">
                <h2>INVOICE</h2>
                <div class="invoice-id">Invoice #${order.InvoiceID}</div>
              </div>
            </div>

            <div class="row">
              <div class="col">
                <p><strong>Date & Time:</strong><br/>${formatDateTime(order.InvoiceDateTime)}</p>
              </div>
              <div class="col text-right">
                <p><strong>Customer Name:</strong><br/>${order.CustomerName || 'Walk-in Customer'}</p>
                <p><strong>Phone Number:</strong><br/>${order.CustomerPhoneNumber || '-'}</p>
              </div>
            </div>

            <!-- Items Table -->
            <table>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                ${order.Items.map(item => `
                  <tr>
                    <td>${item.ProductName} ${item.Unit ? `(${item.Unit})` : ''}</td>
                    <td>${item.Quantity}</td>
                    <td>₹${(item.Amount / item.Quantity).toFixed(2)}</td>
                    <td>₹${item.Amount}</td>
                  </tr>
                `).join('')}
                <tr class="total-row">
                  <td colspan="3" style="text-align: right;">Grand Total:</td>
                  <td>₹${order.InvoiceTotalAmount}</td>
                </tr>
              </tbody>
            </table>
          </body>
        </html>
      `;

      // Generate PDF file
      
       
      const { uri } = await Print.printToFileAsync({
        html: htmlContent
      });
      
      // Share / Download PDF
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, { mimeType: 'application/pdf', dialogTitle: `Invoice_${order.InvoiceID}` });
      } else {
        Alert.alert('Success', `Invoice PDF saved to: ${uri}`);
      }
    } catch (error) {
      console.error('Failed to generate PDF', error);
      Alert.alert('Error', 'Could not generate invoice PDF.');
    }
  };


  const handle_thermal_downloadInvoice = async (order) => {
    try {
      const htmlAtmSlip = `
        <html>
          <head>
            <style>
              body { 
                font-family: 'Courier New', Courier, monospace; 
                width: 260px; 
                margin: 0 auto; 
                padding: 10px; 
                color: #000;
                font-size: 12px;
              }
              .center { text-align: center; }
              .bold { font-weight: bold; }
              .logo { width: 60%; height: 6%; }
              .row { display: flex; justify-content: space-between; margin: 3px 0; }
              .divider { border-bottom: 1px dashed #000; margin: 8px 0; }
              table { width: 100%; border-collapse: collapse; margin-top: 5px; }
              th, td { font-size: 11px; text-align: left; padding: 3px 0; }
              th { border-bottom: 1px dashed #000; }
              .text-right { text-align: right; }
            </style>
          </head>
          <body>
            <div class="center">
              <img src="${API_URL}/images/aavinHomeIcon.png" class="logo" />
            </div>
            <div class="center">22 T.H.Road, M.R.Nagar</div>
            <div class="center">Kodungaiyur, Opp.Poorvika Mobiles</div>
            <div class="center">Chennai - 600118</div>
            <div class="center">Ph: 9444453137/9790768604</div>
            
            <div class="divider"></div>

            <div class="row">
              <span style='font-size:10px'>Bill No: ${order.InvoiceID}</span>
              <span style='font-size:10px'>Date: ${order.InvoiceDateTime}</span>
            </div>

            <div class="row">
              <span>Name: </span>
              <span>${order.CustomerName || 'Walk-in'}</span>
            </div>
            
            <div class="row">
              <span>Mobile: </span>
              <span>${order.CustomerPhoneNumber || '-'}</span>
            </div>

            <div class="divider"></div>

            <table>
              <thead>
                <tr>
                  <th>ITEM</th>
                  <th class="center">QTY</th>
                  <th class="text-right">AMT</th>
                </tr>
              </thead>
              <tbody>
                ${order.Items.map(item => `
                  <tr>
                    <td>${item.ProductName}</td>
                    <td class="center">${item.Quantity}</td>
                    <td class="text-right">₹${item.Amount}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>

            <div class="divider"></div>

            <div class="row bold" style="font-size: 13px;">
              <span>Total:</span>
              <span>₹${order.InvoiceTotalAmount}.00</span>
            </div>

            <div class="row bold" style="font-size: 13px;">
              <span>Cash Value:</span>
              <span>₹200.00</span>
            </div>

            <div class="row bold" style="font-size: 13px;">
              <span>Balance:</span>
              <span>₹40.00</span>
            </div>

            <div class="divider"></div>
            
            <div class="center" style="margin-top: 10px;">THANK YOU! VISIT AGAIN</div>
          </body>
        </html>
      `;
      const { uri } = await Print.printToFileAsync({
        html: htmlAtmSlip,
        width: 164, // ~58mm thermal paper width in points
      });
      
      // Share / Download PDF
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, { mimeType: 'application/pdf', dialogTitle: `Invoice_${order.InvoiceID}` });
      } else {
        Alert.alert('Success', `Invoice PDF saved to: ${uri}`);
      }
    } catch (error) {
      console.error('Failed to generate PDF', error);
      Alert.alert('Error', 'Could not generate invoice PDF.');
    }
  };

  const renderOrderItem = ({ item }) => {
    const totalItems = Array.isArray(item.Items)
      ? item.Items.reduce((sum, orderItem) => sum + Number(orderItem.Quantity || 0), 0)
      : 0;

    return (
      <TouchableOpacity
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 12,
          padding: 16,
          marginHorizontal: 16,
          marginVertical: 6,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 2,
          elevation: 2,
        }}
        activeOpacity={0.7}
        onPress={() => {
          setSelectedOrder(item);
          setIsInvoiceModalVisible(true);
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesome name="file-text-o" size={15} color="#1C7ED6" style={{ marginRight: 6 }} />
            <Text style={{ fontSize: 15, fontWeight: '700', color: '#212529' }}>
              Invoice #{item.InvoiceID}
            </Text>
          </View>
          <Text style={{ fontSize: 16, fontWeight: '800', color: '#2E7D32' }}>
            ₹{item.InvoiceTotalAmount}
          </Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
          <FontAwesome name="user-circle-o" size={13} color="#495057" style={{ marginRight: 6 }} />
          <Text style={{ fontSize: 13, fontWeight: '600', color: '#495057' }}>
            Created by: <Text style={{ color: '#1C7ED6', fontWeight: '700' }}>{item.CreatedByName || '-'}</Text>
          </Text>
        </View>

        <View style={{ height: 1, backgroundColor: '#F1F3F5', marginVertical: 6 }} />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesome name="calendar" size={13} color="#868E96" style={{ marginRight: 6 }} />
            <Text style={{ fontSize: 12, color: '#868E96', fontWeight: '500' }}>
              {formatDateTime(item.InvoiceDateTime)}
            </Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#F1F8E9', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 }}>
            <FontAwesome name="shopping-basket" size={12} color="#2E7D32" style={{ marginRight: 5 }} />
            <Text style={{ fontSize: 12, fontWeight: '700', color: '#2E7D32' }}>
              {totalItems} Item{totalItems !== 1 ? 's' : ''}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#F8F9FA' }]}>
      <View style={{ paddingVertical: 14, alignItems: 'center', backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#F0F0F0' }}>
        <Text style={{ fontSize: 18, fontWeight: '700', color: '#212529' }}>Orders</Text>
      </View>

      <FlatList
        data={orderResponseData}
        renderItem={renderOrderItem}
        keyExtractor={(item) => String(item.InvoiceID)}
        contentContainerStyle={{ paddingVertical: 12 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', marginTop: 60 }}>
            <Text style={{ fontSize: 32, marginBottom: 8 }}>📦</Text>
            <Text style={{ fontSize: 16, fontWeight: '700', color: '#495057' }}>No orders found</Text>
          </View>
        }
      />

      {/* Invoice Detail & Download Modal */}
      <Modal
        visible={isInvoiceModalVisible}
        transparent={true}
        animationType="slide"
        onRequestCorrection={() => setIsInvoiceModalVisible(false)}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}>
          <View style={{ backgroundColor: '#FFFFFF', borderTopLeftRadius: 20, borderTopRightRadius: 20, maxHeight: '85%', padding: 20 }}>
            
            {/* Modal Header */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#F1F3F5', paddingBottom: 12 }}>
              <Text style={{ fontSize: 18, fontWeight: '700', color: '#212529' }}>
                Invoice #{selectedOrder?.InvoiceID}
              </Text>
              <TouchableOpacity onPress={() => setIsInvoiceModalVisible(false)}>
                <FontAwesome name="times" size={20} color="#868E96" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 16 }}>
              {selectedOrder && (
                <>
                  {/* Meta Details */}
                  <View style={{ marginBottom: 16, backgroundColor: '#F8F9FA', padding: 12, borderRadius: 8 }}>
                    <Text style={{ fontSize: 13, color: '#495057', marginBottom: 4 }}>
                      <Text style={{ fontWeight: '700' }}>Date & Time:</Text> {formatDateTime(selectedOrder.InvoiceDateTime)}
                    </Text>
                    <Text style={{ fontSize: 13, color: '#495057', marginBottom: 4 }}>
                      <Text style={{ fontWeight: '700' }}>Customer:</Text> {selectedOrder.CustomerName || 'Walk-in Customer'} ({selectedOrder.CustomerPhoneNumber || '-'})
                    </Text>
                    <Text style={{ fontSize: 13, color: '#495057' }}>
                      <Text style={{ fontWeight: '700' }}>Created By:</Text> {selectedOrder.CreatedByName}
                    </Text>
                  </View>

                  {/* Items List Table Header */}
                  <Text style={{ fontSize: 14, fontWeight: '700', color: '#212529', marginBottom: 8 }}>Ordered Items</Text>
                  
                  {selectedOrder.Items.map((prod, index) => (
                    <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#F1F3F5' }}>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 14, fontWeight: '600', color: '#212529' }}>{prod.ProductName}</Text>
                        <Text style={{ fontSize: 12, color: '#868E96' }}>Qty: {prod.Quantity} {prod.Unit ? `(${prod.Unit})` : ''}</Text>
                      </View>
                      <Text style={{ fontSize: 14, fontWeight: '700', color: '#2E7D32' }}>₹{prod.Amount}</Text>
                    </View>
                  ))}

                  {/* Grand Total */}
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16, paddingTop: 12, borderTopWidth: 2, borderTopColor: '#E9ECEF' }}>
                    <Text style={{ fontSize: 16, fontWeight: '700', color: '#212529' }}>Grand Total</Text>
                    <Text style={{ fontSize: 18, fontWeight: '800', color: '#2E7D32' }}>₹{selectedOrder.InvoiceTotalAmount}</Text>
                  </View>
                </>
              )}
            </ScrollView>

            {/* Download / Share Button */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16, paddingTop: 12, borderTopWidth: 2, borderTopColor: '#E9ECEF' }}>
              <TouchableOpacity
                style={{
                  backgroundColor: Code.primary || '#1C7ED6',
                  borderRadius: 10,
                  paddingVertical: 16,
                  padding: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 12,
                }}
                activeOpacity={0.8}
                onPress={() => handle_pdf_downloadInvoice(selectedOrder)}
              >
                <FontAwesome name="download" size={16} color="#FFFFFF" style={{ marginRight: 8 }} />
                <Text style={{ fontSize: 15, fontWeight: '700', color: '#FFFFFF' }}>Big Invoice PDF</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: Code.primary || '#1C7ED6',
                  borderRadius: 10,
                  paddingVertical: 16,
                  padding: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 12,
                }}
                activeOpacity={0.8}
                onPress={() => handle_thermal_downloadInvoice(selectedOrder)}
              >
                <FontAwesome name="download" size={16} color="#FFFFFF" style={{ marginRight: 8 }} />
                <Text style={{ fontSize: 15, fontWeight: '700', color: '#FFFFFF' }}>Mini Invoice PDF</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}