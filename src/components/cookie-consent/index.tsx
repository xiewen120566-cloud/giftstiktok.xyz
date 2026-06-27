"use client";

import { useEffect, useState } from "react";
import { Box, Button, Flex, Text, Link } from "@chakra-ui/react";
import { useLocale } from "next-intl";
import { Locale } from "@/i18n/routing";
import { getTargetHref } from "@/utils";

export default function CookieConsent() {
  const locale = useLocale() as Locale;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 检查是否已经同意过
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // 如果没有同意过，延迟一点显示，避免页面加载时太突兀
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
    
    // 如果有需要在这里触发的特定追踪代码，可以在这里执行
    // window.ttq?.track('CookieAccepted');
  };

  if (!isVisible) return null;

  return (
    <Box
      position="fixed"
      bottom={{ base: 0, md: "24px" }}
      left={{ base: 0, md: "24px" }}
      right={{ base: 0, md: "auto" }}
      maxW={{ base: "100%", md: "420px" }}
      bg="gray.800"
      borderTop={{ base: "1px solid", md: "none" }}
      border={{ md: "1px solid" }}
      borderColor="gray.700"
      p={{ base: 4, md: 5 }}
      rounded={{ base: "none", md: "xl" }}
      boxShadow="0 -4px 20px rgba(0, 0, 0, 0.5)"
      zIndex={1000}
      animation="slideUp 0.5s ease-out"
      sx={{
        "@keyframes slideUp": {
          "0%": { transform: "translateY(100%)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 }
        }
      }}
    >
      <Flex direction="column" gap={3}>
        <Text fontSize="sm" color="gray.300" lineHeight="tall">
          We use cookies to personalize content, provide social media features, and analyze our traffic. By clicking &quot;Accept&quot;, you consent to our use of cookies. 
          {" "}
          <Link 
            href={getTargetHref(locale, "/privacy-policy")} 
            color="cyan.400" 
            textDecoration="underline"
            _hover={{ color: "cyan.300" }}
          >
            Learn more
          </Link>
        </Text>
        <Flex gap={3} mt={1} justify="flex-end">
          <Button 
            size="sm" 
            variant="outline" 
            colorScheme="gray" 
            color="gray.300"
            borderColor="gray.600"
            _hover={{ bg: "gray.700" }}
            onClick={() => setIsVisible(false)}
          >
            Decline
          </Button>
          <Button 
            size="sm" 
            colorScheme="cyan" 
            onClick={handleAccept}
          >
            Accept Cookies
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}
